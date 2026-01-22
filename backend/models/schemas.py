"""
Pydantic schemas for API validation and serialization
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class JobListingBase(BaseModel):
    """Base job listing schema"""
    title: str
    company: str
    location: str
    job_url: str
    description: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    job_type: str
    experience_level: str
    remote_type: str
    posted_date: datetime


class JobListingCreate(JobListingBase):
    """Schema for creating job listings"""
    skills_required: Optional[List[str]] = None
    source: str = "web"


class JobListingResponse(JobListingBase):
    """Schema for returning job listings"""
    id: str
    salary_score: Optional[float] = None
    growth_potential: Optional[float] = None
    match_score: Optional[float] = None
    category: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JobAnalysisResponse(BaseModel):
    """Schema for job market analysis"""
    metric_name: str
    metric_value: float
    category: str
    time_period: str
    created_at: datetime

    class Config:
        from_attributes = True


class SkillResponse(BaseModel):
    """Schema for skill data"""
    skill_name: str
    frequency: int
    average_salary_impact: float
    trend_direction: str

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    """Dashboard statistics summary"""
    total_jobs: int
    avg_salary: float
    top_companies: List[str]
    top_skills: List[str]
    avg_salary_by_experience: dict
    remote_job_percentage: float
    job_growth_rate: float


class JobSearchQuery(BaseModel):
    """Job search query parameters"""
    keyword: Optional[str] = None
    experience_level: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    location: Optional[str] = None
    remote_type: Optional[str] = None
    skills: Optional[List[str]] = None
    limit: int = Field(default=20, le=100)
    offset: int = Field(default=0)


class MLPredictionRequest(BaseModel):
    """Request for ML predictions"""
    job_id: str
    user_preferences: Optional[dict] = None


class MLPredictionResponse(BaseModel):
    """ML prediction results"""
    job_id: str
    match_score: float
    salary_score: float
    growth_potential: float
    recommendation: str
    confidence: float
