"""
Database models for job listings and analysis
"""
from datetime import datetime
from typing import Optional
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Boolean, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()


class JobListing(Base):
    """Job listing database model"""
    __tablename__ = "job_listings"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String, index=True)
    location = Column(String, index=True)
    job_url = Column(String, unique=True)
    description = Column(Text)
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    salary_currency = Column(String, default="USD")
    job_type = Column(String)  # full-time, part-time, contract
    experience_level = Column(String)  # entry, mid, senior
    skills_required = Column(Text)  # JSON string
    remote_type = Column(String)  # fully-remote, hybrid, on-site
    posted_date = Column(DateTime)
    source = Column(String)  # LinkedIn, Indeed, etc
    is_featured = Column(Boolean, default=False)
    
    # ML Features
    salary_score = Column(Float, nullable=True)
    growth_potential = Column(Float, nullable=True)
    match_score = Column(Float, nullable=True)
    category = Column(String, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        Index('idx_company_location', 'company', 'location'),
        Index('idx_posted_date', 'posted_date'),
        Index('idx_experience_level', 'experience_level'),
    )


class JobAnalysis(Base):
    """Analysis and insights on job market"""
    __tablename__ = "job_analysis"

    id = Column(String, primary_key=True, index=True)
    metric_name = Column(String, index=True)
    metric_value = Column(Float)
    category = Column(String)  # salary, skills, trends, etc
    time_period = Column(String)  # week, month, year
    created_at = Column(DateTime, default=datetime.utcnow)


class JobSkill(Base):
    """In-demand skills analysis"""
    __tablename__ = "job_skills"

    id = Column(String, primary_key=True, index=True)
    skill_name = Column(String, unique=True, index=True)
    frequency = Column(Integer)
    average_salary_impact = Column(Float)
    trend_direction = Column(String)  # up, down, stable
    last_updated = Column(DateTime, default=datetime.utcnow)


class UserPreference(Base):
    """User saved preferences and bookmarks"""
    __tablename__ = "user_preferences"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True)
    saved_jobs = Column(Text)  # JSON array of job IDs
    preferences = Column(Text)  # JSON of preferences
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
