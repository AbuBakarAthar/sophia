"""
Jobs API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from backend.models.schemas import (
    JobListingResponse, JobSearchQuery, DashboardStats,
    MLPredictionRequest, MLPredictionResponse
)
from backend.utils.database import get_db, DatabaseService
from backend.models.ml_models import (
    JobRecommendationModel, SalaryPredictionModel, SkillTrendModel
)

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

# Initialize ML models
recommendation_model = JobRecommendationModel()
salary_model = SalaryPredictionModel()


@router.get("/", response_model=List[JobListingResponse])
async def search_jobs(
    keyword: str = Query(None),
    experience_level: str = Query(None),
    remote_type: str = Query(None),
    salary_min: float = Query(None),
    location: str = Query(None),
    limit: int = Query(20, le=100),
    offset: int = Query(0),
    db: Session = Depends(get_db)
):
    """Search jobs with filters"""
    query = {
        'keyword': keyword,
        'experience_level': experience_level,
        'remote_type': remote_type,
        'salary_min': salary_min,
        'location': location,
        'limit': limit,
        'offset': offset
    }
    
    jobs = DatabaseService.search_jobs(db, query)
    return [JobListingResponse.model_validate(job) for job in jobs]


@router.get("/{job_id}", response_model=JobListingResponse)
async def get_job(job_id: str, db: Session = Depends(get_db)):
    """Get job by ID"""
    job = DatabaseService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobListingResponse.model_validate(job)


@router.post("/predict-salary")
async def predict_salary(job_id: str, db: Session = Depends(get_db)):
    """Predict salary for a job"""
    job = DatabaseService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job_dict = {
        'experience_level': job.experience_level,
        'skills_required': job.skills_required.split(',') if job.skills_required else [],
        'remote_type': job.remote_type,
        'company': job.company,
        'location': job.location
    }
    
    salary_min, salary_max = salary_model.predict(job_dict)
    
    return {
        'job_id': job_id,
        'predicted_salary_min': salary_min,
        'predicted_salary_max': salary_max,
        'currency': 'USD'
    }


@router.post("/recommendation")
async def get_recommendation(
    request: MLPredictionRequest,
    db: Session = Depends(get_db)
):
    """Get job recommendation with match score"""
    job = DatabaseService.get_job_by_id(db, request.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job_dict = {
        'experience_level': job.experience_level,
        'skills_required': job.skills_required.split(',') if job.skills_required else [],
        'remote_type': job.remote_type,
        'company': job.company,
        'location': job.location,
        'salary_max': job.salary_max or 100000
    }
    
    user_prefs = request.user_preferences or {
        'experience_level': 'mid',
        'skills': [],
        'salary_min': 60000,
        'location': '',
        'remote_preference': 'any'
    }
    
    match_score = recommendation_model.calculate_match_score(job_dict, user_prefs)
    growth_potential = recommendation_model.calculate_growth_potential(job_dict)
    
    recommendation = 'highly_recommended' if match_score > 0.7 else 'recommended' if match_score > 0.5 else 'maybe'
    
    return MLPredictionResponse(
        job_id=request.job_id,
        match_score=match_score,
        salary_score=(job.salary_max or 100000) / 150000,
        growth_potential=growth_potential,
        recommendation=recommendation,
        confidence=min(match_score + growth_potential) / 2
    )


@router.get("/stats", response_model=DashboardStats)
async def get_stats(db: Session = Depends(get_db)):
    """Get job market statistics for dashboard"""
    stats = DatabaseService.get_statistics(db)
    
    return DashboardStats(
        total_jobs=stats['total_jobs'],
        avg_salary=stats['avg_salary'],
        top_companies=[c['name'] for c in stats['top_companies'][:5]],
        top_skills=['Python', 'SQL', 'AWS', 'Spark', 'Kubernetes'],
        avg_salary_by_experience={
            'entry': 60000,
            'mid': 100000,
            'senior': 150000
        },
        remote_job_percentage=stats['remote_percentage'],
        job_growth_rate=5.2
    )
