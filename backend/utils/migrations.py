"""
Database migration utilities
"""
from sqlalchemy import text
from sqlalchemy.orm import Session
from backend.models.database import Base, engine


def create_indexes(db: Session):
    """Create database indexes for performance"""
    
    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_job_title ON job_listings(title)",
        "CREATE INDEX IF NOT EXISTS idx_job_remote ON job_listings(remote_type)",
        "CREATE INDEX IF NOT EXISTS idx_job_salary ON job_listings(salary_min, salary_max)",
        "CREATE INDEX IF NOT EXISTS idx_skill_frequency ON job_skills(frequency DESC)",
    ]
    
    for index_sql in indexes:
        db.execute(text(index_sql))
    
    db.commit()


def init_sample_data(db: Session):
    """Initialize sample data for development"""
    from backend.models.database import JobSkill
    
    # Only initialize if table is empty
    count = db.query(JobSkill).count()
    if count > 0:
        return
    
    sample_skills = [
        JobSkill(id="1", skill_name="Python", frequency=450, average_salary_impact=15000, trend_direction="up"),
        JobSkill(id="2", skill_name="SQL", frequency=380, average_salary_impact=12000, trend_direction="stable"),
        JobSkill(id="3", skill_name="AWS", frequency=320, average_salary_impact=18000, trend_direction="up"),
        JobSkill(id="4", skill_name="Kubernetes", frequency=180, average_salary_impact=22000, trend_direction="up"),
        JobSkill(id="5", skill_name="Go", frequency=120, average_salary_impact=20000, trend_direction="up"),
    ]
    
    for skill in sample_skills:
        db.add(skill)
    
    db.commit()
