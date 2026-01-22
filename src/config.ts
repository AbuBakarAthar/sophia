// API configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.remotejobs.ai'
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  JOBS_SEARCH: '/api/jobs',
  JOB_DETAIL: '/api/jobs/:id',
  RECOMMENDATION: '/api/jobs/recommendation',
  PREDICT_SALARY: '/api/jobs/predict-salary',
  STATS: '/api/jobs/stats',
  ADMIN_REFRESH: '/api/admin/refresh-data',
  ADMIN_HEALTH: '/api/admin/health',
  ADMIN_STATS: '/api/admin/stats'
};

// Mock data for development when backend is not available
export const MOCK_STATS = {
  total_jobs: 2847,
  average_salary: 145000,
  remote_percentage: 78,
  growth_rate: 12.5,
  top_skills: [
    { skill: 'Python', count: 892, salary_impact: 15000 },
    { skill: 'Machine Learning', count: 756, salary_impact: 22000 },
    { skill: 'Data Engineering', count: 645, salary_impact: 18000 },
    { skill: 'Cloud (AWS/GCP)', count: 723, salary_impact: 19000 },
    { skill: 'SQL', count: 834, salary_impact: 12000 }
  ],
  top_companies: [
    { name: 'Google', count: 145 },
    { name: 'Amazon', count: 132 },
    { name: 'Microsoft', count: 128 },
    { name: 'Apple', count: 115 },
    { name: 'Meta', count: 102 }
  ]
};
