"""
Backend configuration management
"""
import os
from typing import Literal
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    environment: Literal["development", "staging", "production"] = "development"
    debug: bool = True
    
    # API
    api_title: str = "USA Remote Jobs ML Pipeline"
    api_version: str = "1.0.0"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # Database
    database_url: str = "sqlite:///./jobs.db"
    
    # Data Pipeline
    data_refresh_interval: int = 3600  # 1 hour in seconds
    max_jobs_per_scrape: int = 1000
    
    # ML Models
    models_dir: str = "backend/models/saved"
    
    # CORS
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
