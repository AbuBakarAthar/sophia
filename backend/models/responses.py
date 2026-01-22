"""
API response models for consistent responses
"""
from datetime import datetime
from typing import Any, Optional, List
from pydantic import BaseModel


class SuccessResponse(BaseModel):
    """Standard success response"""
    success: bool = True
    data: Any
    message: str = "Success"
    timestamp: datetime = datetime.utcnow()


class ErrorResponse(BaseModel):
    """Standard error response"""
    success: bool = False
    error: str
    message: str
    timestamp: datetime = datetime.utcnow()


class PaginatedResponse(BaseModel):
    """Paginated response wrapper"""
    data: List[Any]
    total: int
    page: int
    page_size: int
    pages: int


class MetricsResponse(BaseModel):
    """Metrics response"""
    timestamp: datetime = datetime.utcnow()
    metric_name: str
    value: float
    unit: str
    tags: dict = {}
