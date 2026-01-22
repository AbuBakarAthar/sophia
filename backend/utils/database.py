"""
Database connection and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from backend.config import settings
from backend.models.database import Base
import logging

logger = logging.getLogger(__name__)

# Create database engine
engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Session:
    """Get database session dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    logger.info("Database initialized")


class DatabaseService:
    """Service for database operations"""
    
    @staticmethod
    def insert_jobs(db: Session, jobs: list) -> int:
        """Insert jobs into database"""
        from backend.models.database import JobListing
        import uuid
        
        count = 0
        for job in jobs:
            try:
                job_listing = JobListing(
                    id=job.get('id', str(uuid.uuid4())),
                    title=job.get('title'),
                    company=job.get('company'),
                    location=job.get('location'),
                    job_url=job.get('job_url'),
                    description=job.get('description'),
                    salary_min=job.get('salary_min'),
                    salary_max=job.get('salary_max'),
                    job_type=job.get('job_type', 'full-time'),
                    experience_level=job.get('experience_level', 'mid'),
                    skills_required=','.join(job.get('skills_required', [])),
                    remote_type=job.get('remote_type', 'on-site'),
                    posted_date=job.get('posted_date'),
                    source=job.get('source', 'web')
                )
                db.add(job_listing)
                count += 1
            except Exception as e:
                logger.error(f"Error inserting job: {e}")
                continue
        
        try:
            db.commit()
        except Exception as e:
            db.rollback()
            logger.error(f"Error committing jobs: {e}")
        
        return count
    
    @staticmethod
    def get_all_jobs(db: Session, limit: int = 100, offset: int = 0):
        """Get all jobs from database"""
        from backend.models.database import JobListing
        
        return db.query(JobListing).offset(offset).limit(limit).all()
    
    @staticmethod
    def get_job_by_id(db: Session, job_id: str):
        """Get job by ID"""
        from backend.models.database import JobListing
        
        return db.query(JobListing).filter(JobListing.id == job_id).first()
    
    @staticmethod
    def search_jobs(db: Session, query: dict) -> list:
        """Search jobs with filters"""
        from backend.models.database import JobListing
        
        q = db.query(JobListing)
        
        if query.get('keyword'):
            keyword = f"%{query['keyword']}%"
            q = q.filter(
                (JobListing.title.ilike(keyword)) |
                (JobListing.description.ilike(keyword))
            )
        
        if query.get('experience_level'):
            q = q.filter(JobListing.experience_level == query['experience_level'])
        
        if query.get('remote_type'):
            q = q.filter(JobListing.remote_type == query['remote_type'])
        
        if query.get('salary_min'):
            q = q.filter(JobListing.salary_max >= query['salary_min'])
        
        if query.get('location'):
            q = q.filter(JobListing.location.ilike(f"%{query['location']}%"))
        
        limit = query.get('limit', 20)
        offset = query.get('offset', 0)
        
        return q.limit(limit).offset(offset).all()
    
    @staticmethod
    def get_statistics(db: Session) -> dict:
        """Get job market statistics"""
        from backend.models.database import JobListing
        from sqlalchemy import func
        
        total_jobs = db.query(func.count(JobListing.id)).scalar() or 0
        avg_salary = db.query(func.avg(JobListing.salary_max)).scalar() or 0
        
        # Top companies
        top_companies = db.query(
            JobListing.company,
            func.count(JobListing.id).label('count')
        ).group_by(JobListing.company).order_by(func.count(JobListing.id).desc()).limit(5).all()
        
        # Experience distribution
        experience_dist = db.query(
            JobListing.experience_level,
            func.count(JobListing.id).label('count')
        ).group_by(JobListing.experience_level).all()
        
        # Remote distribution
        remote_count = db.query(
            func.count(JobListing.id)
        ).filter(JobListing.remote_type == 'fully-remote').scalar() or 0
        
        remote_percentage = (remote_count / total_jobs * 100) if total_jobs > 0 else 0
        
        return {
            'total_jobs': total_jobs,
            'avg_salary': float(avg_salary) if avg_salary else 0,
            'top_companies': [{'name': c[0], 'count': c[1]} for c in top_companies],
            'experience_distribution': [{'level': e[0], 'count': e[1]} for e in experience_dist],
            'remote_percentage': remote_percentage
        }
