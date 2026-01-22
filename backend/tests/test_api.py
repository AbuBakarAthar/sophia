"""
Integration tests for API endpoints
"""
import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/api/admin/health")
    assert response.status_code == 200
    assert response.json()['status'] == 'healthy'


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "version" in response.json()


def test_get_stats():
    response = client.get("/api/jobs/stats")
    # This might 404 if no jobs are in db
    assert response.status_code in [200, 404]


def test_search_jobs_empty():
    response = client.get("/api/jobs?limit=10")
    assert response.status_code == 200
