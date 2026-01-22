"""
Unit tests for ML models
"""
import pytest
from backend.models.ml_models import SalaryPredictionModel, JobRecommendationModel


class TestSalaryPredictionModel:
    def setup_method(self):
        self.model = SalaryPredictionModel()
    
    def test_baseline_salary_entry_level(self):
        job = {'experience_level': 'entry', 'remote_type': 'on-site'}
        salary = self.model._baseline_salary(job)
        assert salary == 50000
    
    def test_baseline_salary_remote_bonus(self):
        job = {'experience_level': 'mid', 'remote_type': 'fully-remote'}
        salary = self.model._baseline_salary(job)
        assert salary == 92000  # 80000 * 1.15
    
    def test_predict_returns_range(self):
        job = {
            'experience_level': 'senior',
            'skills_required': ['python', 'aws', 'kubernetes'],
            'remote_type': 'fully-remote',
            'company': 'Google',
            'location': 'San Francisco'
        }
        min_sal, max_sal = self.model.predict(job)
        assert min_sal > 0
        assert max_sal > min_sal


class TestJobRecommendationModel:
    def setup_method(self):
        self.model = JobRecommendationModel()
    
    def test_match_score_perfect_match(self):
        job = {
            'experience_level': 'mid',
            'skills_required': ['python', 'sql', 'aws'],
            'salary_max': 120000,
            'location': 'San Francisco',
            'remote_type': 'fully-remote'
        }
        user = {
            'experience_level': 'mid',
            'skills': ['python', 'sql', 'aws'],
            'salary_min': 100000,
            'location': 'San Francisco',
            'remote_preference': 'fully-remote'
        }
        score = self.model.calculate_match_score(job, user)
        assert score > 0.7
    
    def test_growth_potential_score_range(self):
        job = {
            'company_type': 'startup',
            'skills_required': ['ai', 'ml', 'python'],
            'experience_level': 'mid'
        }
        score = self.model.calculate_growth_potential(job)
        assert 0 <= score <= 1
