"""
Data pipeline for scraping and processing job listings
"""
import json
import re
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)


class JobScraperBase:
    """Base class for job scrapers"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def scrape(self) -> List[Dict]:
        """Scrape jobs - to be implemented by subclasses"""
        raise NotImplementedError


class RemoteJobsScraperAPI(JobScraperBase):
    """Scraper using free remote jobs API"""
    
    def __init__(self):
        super().__init__()
        self.api_url = "https://remoteok.com/api"
        self.source = "remoteok"
    
    def scrape(self) -> List[Dict]:
        """Scrape remote jobs from RemoteOK API"""
        jobs = []
        try:
            response = self.session.get(self.api_url, params={'search': 'python'}, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            for item in data[:100]:  # Limit to 100
                if isinstance(item, dict) and 'job_title' in item:
                    job = self._parse_job(item)
                    if job:
                        jobs.append(job)
        except Exception as e:
            logger.error(f"Error scraping RemoteOK: {e}")
        
        return jobs
    
    @staticmethod
    def _parse_job(item: Dict) -> Optional[Dict]:
        """Parse job item from API"""
        try:
            salary_text = item.get('salary', '').replace('$', '').replace(',', '')
            salary_parts = re.findall(r'\d+', salary_text)
            
            salary_min = None
            salary_max = None
            if len(salary_parts) >= 1:
                salary_max = int(salary_parts[0]) if salary_parts[0] else None
                if len(salary_parts) >= 2:
                    salary_min = int(salary_parts[1])
            
            skills = re.findall(r'\b(python|javascript|java|go|rust|c\+\+|react|vue|angular|aws|gcp|azure|kubernetes|docker|sql|postgresql|mongodb)\b', 
                               item.get('job_description', '').lower())
            
            return {
                'id': f"remoteok_{item.get('id')}",
                'title': item.get('job_title', ''),
                'company': item.get('company_name', ''),
                'location': 'Remote',
                'job_url': item.get('url', ''),
                'description': item.get('job_description', '')[:2000],
                'salary_min': salary_min,
                'salary_max': salary_max,
                'job_type': 'full-time',
                'experience_level': 'mid',
                'remote_type': 'fully-remote',
                'skills_required': list(set(skills)),
                'posted_date': datetime.utcnow(),
                'source': 'remoteok'
            }
        except Exception as e:
            logger.error(f"Error parsing job: {e}")
            return None


class LinkedInScraperSimulation(JobScraperBase):
    """Simulated LinkedIn scraper with realistic data"""
    
    def __init__(self):
        super().__init__()
        self.source = "linkedin"
    
    def scrape(self) -> List[Dict]:
        """Generate realistic job data for demonstration"""
        return self._generate_sample_jobs()
    
    @staticmethod
    def _generate_sample_jobs() -> List[Dict]:
        """Generate sample job data"""
        companies = ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Stripe', 'Figma', 'Notion', 'GitLab']
        locations = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Denver, CO', 'Remote']
        titles = [
            'Senior Machine Learning Engineer',
            'Data Engineer',
            'ML Platform Engineer',
            'Python Backend Engineer',
            'Full Stack ML Engineer',
            'Analytics Engineer',
            'Data Scientist',
            'ML Operations Engineer'
        ]
        
        jobs = []
        for i, (company, title) in enumerate([(companies[i % len(companies)], titles[i % len(titles)]) for i in range(30)]):
            location = locations[i % len(locations)]
            skills = ['Python', 'SQL', 'AWS', 'Spark', 'Kubernetes', 'TensorFlow', 'PyTorch', 'Airflow']
            
            job = {
                'id': f"linkedin_{i}",
                'title': title,
                'company': company,
                'location': location,
                'job_url': f"https://linkedin.com/jobs/{i}",
                'description': f"Join {company} to build cutting-edge ML solutions. We're looking for experienced professionals.",
                'salary_min': 120000 + i * 5000,
                'salary_max': 180000 + i * 5000,
                'job_type': 'full-time',
                'experience_level': ['entry', 'mid', 'senior'][i % 3],
                'remote_type': ['fully-remote', 'hybrid', 'on-site'][i % 3],
                'skills_required': skills[i % len(skills):],
                'posted_date': datetime.utcnow() - timedelta(days=i % 30),
                'source': 'linkedin',
                'company_type': ['startup', 'scale-up', 'enterprise'][i % 3]
            }
            jobs.append(job)
        
        return jobs


class DataProcessor:
    """Process and enrich raw job data"""
    
    @staticmethod
    def clean_job_data(job: Dict) -> Dict:
        """Clean and normalize job data"""
        job['skills_required'] = list(set([s.lower().strip() for s in job.get('skills_required', [])]))
        job['title'] = job.get('title', '').strip()
        job['company'] = job.get('company', '').strip()
        job['location'] = job.get('location', '').strip()
        
        # Normalize experience level
        exp_level = job.get('experience_level', 'mid').lower()
        if any(x in exp_level for x in ['entry', 'junior', 'graduate']):
            job['experience_level'] = 'entry'
        elif any(x in exp_level for x in ['mid', 'intermediate']):
            job['experience_level'] = 'mid'
        elif any(x in exp_level for x in ['senior', 'lead', 'principal']):
            job['experience_level'] = 'senior'
        
        # Normalize remote type
        remote = job.get('remote_type', 'on-site').lower()
        if 'fully' in remote or 'fully-remote' in remote:
            job['remote_type'] = 'fully-remote'
        elif 'hybrid' in remote:
            job['remote_type'] = 'hybrid'
        else:
            job['remote_type'] = 'on-site'
        
        return job
    
    @staticmethod
    def extract_skills(description: str) -> List[str]:
        """Extract skills from job description"""
        common_skills = {
            'python', 'java', 'javascript', 'go', 'rust', 'c++', 'sql',
            'aws', 'gcp', 'azure', 'kubernetes', 'docker', 'terraform',
            'spark', 'hadoop', 'kafka', 'flink',
            'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
            'react', 'vue', 'angular', 'node.js', 'django', 'flask',
            'postgresql', 'mongodb', 'redis', 'elasticsearch',
            'git', 'ci/cd', 'jenkins', 'gitlab', 'github',
            'agile', 'scrum', 'jira'
        }
        
        description_lower = description.lower()
        found_skills = [skill for skill in common_skills if skill in description_lower]
        return list(set(found_skills))


class DataPipeline:
    """Main data pipeline orchestrator"""
    
    def __init__(self):
        self.scrapers = [
            LinkedInScraperSimulation(),  # Using simulation for demo
        ]
        self.processor = DataProcessor()
    
    def run(self) -> List[Dict]:
        """Run the complete data pipeline"""
        all_jobs = []
        
        # Scrape from all sources
        for scraper in self.scrapers:
            try:
                jobs = scraper.scrape()
                all_jobs.extend(jobs)
                logger.info(f"Scraped {len(jobs)} jobs from {scraper.source}")
            except Exception as e:
                logger.error(f"Error in scraper: {e}")
        
        # Clean and enrich data
        processed_jobs = []
        for job in all_jobs:
            try:
                # Clean data
                job = self.processor.clean_job_data(job)
                
                # Extract additional skills if not provided
                if not job.get('skills_required'):
                    job['skills_required'] = self.processor.extract_skills(job.get('description', ''))
                
                processed_jobs.append(job)
            except Exception as e:
                logger.error(f"Error processing job: {e}")
        
        logger.info(f"Processed {len(processed_jobs)} jobs")
        return processed_jobs
