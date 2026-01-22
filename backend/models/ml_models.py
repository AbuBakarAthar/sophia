"""
ML models for job market analysis and predictions
"""
import json
import pickle
from datetime import datetime
from typing import List, Dict, Optional, Tuple
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
import os


class SalaryPredictionModel:
    """Predict salary ranges for jobs"""
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = [
            'experience_level_encoded',
            'skills_count',
            'remote_type_bonus',
            'company_tier',
            'location_tier'
        ]
        self.models_dir = "backend/models/saved"
        self._ensure_models_dir()
    
    def _ensure_models_dir(self):
        """Ensure models directory exists"""
        os.makedirs(self.models_dir, exist_ok=True)
    
    def train(self, training_data: List[Dict]) -> None:
        """Train salary prediction model"""
        if not training_data:
            return
        
        X = []
        y = []
        
        for record in training_data:
            features = [
                self._encode_experience(record.get('experience_level', 'mid')),
                len(record.get('skills_required', [])),
                1.15 if record.get('remote_type') == 'fully-remote' else 1.0,
                self._company_tier_score(record.get('company', '')),
                self._location_tier_score(record.get('location', ''))
            ]
            X.append(features)
            
            salary_max = record.get('salary_max', 100000)
            y.append(salary_max)
        
        if X and y:
            X_scaled = self.scaler.fit_transform(np.array(X))
            self.model = RandomForestRegressor(n_estimators=100, random_state=42)
            self.model.fit(X_scaled, np.array(y))
            self.save()
    
    def predict(self, job_data: Dict) -> Tuple[float, float]:
        """Predict salary range for a job"""
        if self.model is None:
            return self._baseline_salary(job_data), self._baseline_salary(job_data) * 1.2
        
        features = [
            self._encode_experience(job_data.get('experience_level', 'mid')),
            len(job_data.get('skills_required', [])),
            1.15 if job_data.get('remote_type') == 'fully-remote' else 1.0,
            self._company_tier_score(job_data.get('company', '')),
            self._location_tier_score(job_data.get('location', ''))
        ]
        
        X_scaled = self.scaler.transform(np.array([features]))
        predicted_max = self.model.predict(X_scaled)[0]
        predicted_min = predicted_max * 0.85
        
        return max(40000, predicted_min), max(60000, predicted_max)
    
    @staticmethod
    def _encode_experience(level: str) -> float:
        """Encode experience level to numeric value"""
        mapping = {'entry': 0.3, 'mid': 0.6, 'senior': 0.9, 'lead': 1.0}
        return mapping.get(level.lower(), 0.6)
    
    @staticmethod
    def _company_tier_score(company: str) -> float:
        """Score company tier (FAANG, enterprise, startup, etc)"""
        faang = {'google', 'amazon', 'apple', 'facebook', 'meta', 'microsoft', 'netflix', 'tesla'}
        if any(f in company.lower() for f in faang):
            return 0.95
        if any(x in company.lower() for x in ['inc', 'corp', 'llc', 'inc.']):
            return 0.7
        return 0.5
    
    @staticmethod
    def _location_tier_score(location: str) -> float:
        """Score location tier for salary"""
        tier1 = {'san francisco', 'new york', 'seattle', 'boston', 'los angeles'}
        tier2 = {'chicago', 'denver', 'austin', 'atlanta', 'miami'}
        
        loc_lower = location.lower()
        if any(t in loc_lower for t in tier1):
            return 1.0
        if any(t in loc_lower for t in tier2):
            return 0.8
        return 0.6
    
    @staticmethod
    def _baseline_salary(job_data: Dict) -> float:
        """Get baseline salary based on job characteristics"""
        experience_mult = {
            'entry': 50000,
            'mid': 80000,
            'senior': 120000,
            'lead': 150000
        }
        base = experience_mult.get(job_data.get('experience_level', 'mid'), 80000)
        
        if job_data.get('remote_type') == 'fully-remote':
            base *= 1.15
        
        return base
    
    def save(self) -> None:
        """Save model to disk"""
        if self.model:
            pickle.dump(self.model, open(f"{self.models_dir}/salary_model.pkl", "wb"))
            pickle.dump(self.scaler, open(f"{self.models_dir}/salary_scaler.pkl", "wb"))
    
    def load(self) -> None:
        """Load model from disk"""
        try:
            self.model = pickle.load(open(f"{self.models_dir}/salary_model.pkl", "rb"))
            self.scaler = pickle.load(open(f"{self.models_dir}/salary_scaler.pkl", "rb"))
        except FileNotFoundError:
            pass


class JobRecommendationModel:
    """Recommend jobs based on user preferences"""
    
    def __init__(self):
        self.model = None
        self.models_dir = "backend/models/saved"
        self._ensure_models_dir()
    
    def _ensure_models_dir(self):
        """Ensure models directory exists"""
        os.makedirs(self.models_dir, exist_ok=True)
    
    def calculate_match_score(self, job: Dict, user_prefs: Dict) -> float:
        """Calculate job match score for user preferences"""
        score = 0.0
        weights = {
            'experience_match': 0.25,
            'skills_match': 0.30,
            'salary_match': 0.20,
            'location_match': 0.15,
            'remote_match': 0.10
        }
        
        # Experience match
        user_exp = user_prefs.get('experience_level', 'mid')
        job_exp = job.get('experience_level', 'mid')
        exp_match = 1.0 if user_exp == job_exp else 0.6
        score += exp_match * weights['experience_match']
        
        # Skills match
        user_skills = set(s.lower() for s in user_prefs.get('skills', []))
        job_skills = set(s.lower() for s in job.get('skills_required', []))
        if user_skills and job_skills:
            skills_match = len(user_skills & job_skills) / len(user_skills | job_skills)
        else:
            skills_match = 0.5
        score += skills_match * weights['skills_match']
        
        # Salary match
        user_sal_min = user_prefs.get('salary_min', 50000)
        job_sal_max = job.get('salary_max', 150000)
        sal_match = 1.0 if job_sal_max >= user_sal_min else (job_sal_max / user_sal_min)
        score += sal_match * weights['salary_match']
        
        # Location match
        user_loc = user_prefs.get('location', '')
        job_loc = job.get('location', '')
        loc_match = 1.0 if user_loc.lower() in job_loc.lower() else 0.3
        score += loc_match * weights['location_match']
        
        # Remote match
        user_remote = user_prefs.get('remote_preference', 'any')
        job_remote = job.get('remote_type', 'on-site')
        remote_match = 1.0 if user_remote == 'any' or user_remote in job_remote else 0.3
        score += remote_match * weights['remote_match']
        
        return min(1.0, max(0.0, score))
    
    def calculate_growth_potential(self, job: Dict) -> float:
        """Calculate career growth potential score"""
        score = 0.0
        
        # Company growth potential
        company_growth = {
            'startup': 0.9,
            'growth-stage': 0.8,
            'scale-up': 0.7,
            'enterprise': 0.5
        }
        company_type = job.get('company_type', 'growth-stage')
        score += company_growth.get(company_type, 0.6) * 0.3
        
        # Skill development potential (based on required skills)
        skills_count = len(job.get('skills_required', []))
        growth_skills = {'AI', 'ML', 'cloud', 'kubernetes', 'aws', 'python', 'go', 'rust'}
        growth_skill_count = len(set(s.lower() for s in job.get('skills_required', [])) & growth_skills)
        score += (growth_skill_count / max(skills_count, 1) * 0.4) * 0.4
        
        # Career level advancement
        exp_level = job.get('experience_level', 'mid')
        exp_growth = {'entry': 0.4, 'mid': 0.7, 'senior': 0.9, 'lead': 0.95}
        score += exp_growth.get(exp_level, 0.7) * 0.3
        
        return min(1.0, score)


class SkillTrendModel:
    """Analyze skill trends and demand"""
    
    @staticmethod
    def calculate_skill_score(skill: str, job_market_data: List[Dict]) -> Dict:
        """Calculate demand and trend for a skill"""
        if not job_market_data:
            return {'frequency': 0, 'trend': 'unknown', 'avg_salary_impact': 0}
        
        occurrences = 0
        salary_impacts = []
        
        for job in job_market_data:
            skills = [s.lower() for s in job.get('skills_required', [])]
            if skill.lower() in skills:
                occurrences += 1
                salary_max = job.get('salary_max', 100000)
                salary_impacts.append(salary_max)
        
        frequency = occurrences / len(job_market_data)
        avg_salary_impact = np.mean(salary_impacts) if salary_impacts else 0
        
        trend = 'up' if frequency > 0.15 else 'down' if frequency < 0.05 else 'stable'
        
        return {
            'frequency': frequency,
            'trend': trend,
            'avg_salary_impact': avg_salary_impact,
            'count': occurrences
        }
