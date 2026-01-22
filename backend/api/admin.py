"""
Admin and data management endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.utils.database import get_db, DatabaseService
from backend.pipelines.data_pipeline import DataPipeline
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/admin", tags=["admin"])
pipeline = DataPipeline()


@router.post("/refresh-data")
async def refresh_data(db: Session = Depends(get_db)):
    """Refresh job data from sources"""
    try:
        jobs = pipeline.run()
        count = DatabaseService.insert_jobs(db, jobs)
        logger.info(f"Inserted {count} new jobs")
        return {
            'success': True,
            'jobs_inserted': count,
            'message': f"Successfully refreshed job data with {count} new jobs"
        }
    except Exception as e:
        logger.error(f"Error refreshing data: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        'status': 'healthy',
        'service': 'USA Remote Jobs ML Pipeline',
        'version': '1.0.0'
    }


@router.get("/stats")
async def get_detailed_stats(db: Session = Depends(get_db)):
    """Get detailed statistics"""
    stats = DatabaseService.get_statistics(db)
    return stats
