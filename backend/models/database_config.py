"""
Database connection and configuration file for production
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

def get_database_url():
    """Get database URL from environment"""
    environment = os.getenv('ENVIRONMENT', 'development')
    
    if environment == 'production':
        # Production: Use RDS
        return f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    elif environment == 'staging':
        # Staging: Use staging RDS
        return f"postgresql://staging:staging@staging-db:5432/jobs_staging"
    else:
        # Development: Use SQLite
        return "sqlite:///./jobs.db"


def get_engine():
    """Create SQLAlchemy engine with production settings"""
    database_url = get_database_url()
    
    if 'sqlite' in database_url:
        return create_engine(
            database_url,
            connect_args={"check_same_thread": False}
        )
    else:
        # PostgreSQL with connection pooling
        return create_engine(
            database_url,
            poolclass=QueuePool,
            pool_size=20,
            max_overflow=40,
            pool_pre_ping=True,  # Verify connections before using
            pool_recycle=3600,   # Recycle connections after 1 hour
            echo=False
        )
