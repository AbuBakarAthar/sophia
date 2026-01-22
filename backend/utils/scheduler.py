"""
Production-ready scheduler for background tasks
"""
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from backend.pipelines.data_pipeline import DataPipeline
from backend.utils.database import SessionLocal, DatabaseService
import logging

logger = logging.getLogger(__name__)


class JobScheduler:
    """Manages background job scheduling"""
    
    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.pipeline = DataPipeline()
    
    def start(self):
        """Start the scheduler"""
        # Refresh job data every 6 hours
        self.scheduler.add_job(
            self._refresh_jobs,
            IntervalTrigger(hours=6),
            id='refresh_jobs',
            name='Refresh job listings',
            replace_existing=True
        )
        
        # Update ML models every 24 hours
        self.scheduler.add_job(
            self._update_models,
            IntervalTrigger(hours=24),
            id='update_models',
            name='Update ML models',
            replace_existing=True
        )
        
        self.scheduler.start()
        logger.info("Job scheduler started")
    
    def stop(self):
        """Stop the scheduler"""
        self.scheduler.shutdown()
        logger.info("Job scheduler stopped")
    
    def _refresh_jobs(self):
        """Refresh job data from sources"""
        try:
            db = SessionLocal()
            jobs = self.pipeline.run()
            count = DatabaseService.insert_jobs(db, jobs)
            logger.info(f"Refreshed {count} jobs")
            db.close()
        except Exception as e:
            logger.error(f"Error refreshing jobs: {e}")
    
    def _update_models(self):
        """Retrain ML models with new data"""
        try:
            db = SessionLocal()
            jobs = DatabaseService.get_all_jobs(db, limit=1000)
            
            # Convert to dicts for training
            job_dicts = [
                {
                    'experience_level': job.experience_level,
                    'skills_required': job.skills_required.split(',') if job.skills_required else [],
                    'remote_type': job.remote_type,
                    'company': job.company,
                    'location': job.location,
                    'salary_max': job.salary_max
                }
                for job in jobs
            ]
            
            # Retrain models
            from backend.models.ml_models import SalaryPredictionModel
            model = SalaryPredictionModel()
            model.train(job_dicts)
            
            logger.info("ML models updated successfully")
            db.close()
        except Exception as e:
            logger.error(f"Error updating models: {e}")
