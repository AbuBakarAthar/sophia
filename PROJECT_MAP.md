🗺️ COMPLETE PROJECT MAP
========================

## 📱 FRONTEND
Location: src/

### Main Application
- App.tsx
  ├── Dashboard.tsx (Main view)
  │   ├── StatCard.tsx (4 stat cards)
  │   ├── TopSkillsCard.tsx (Skill visualization)
  │   ├── CompanyChart.tsx (Top companies)
  │   └── SalaryBar (Salary visualization)
  │
  ├── JobListingsPage.tsx (Search interface)
  │   ├── Search filters
  │   └── JobCard.tsx (Individual job display)
  │       ├── Match score calculation
  │       ├── Salary display
  │       └── Action buttons
  │
  └── AnalyticsPage.tsx (Market insights)
      ├── AnalyticsCard (Distribution charts)
      ├── TrendItem (Market trends)
      └── SalaryAnalysisRow (Salary insights)

### Navigation
- Navbar.tsx
  ├── Logo and branding
  ├── Navigation buttons
  └── Login button

### Configuration
- config.ts (API endpoints)
- main.tsx (React entry point)

---

## 🐍 BACKEND
Location: backend/

### API Layer (api/)
- app.py
  └── FastAPI setup
      ├── CORS middleware
      ├── GZIP compression
      ├── Lifespan management
      └── Route registration

- routes.py (Main API)
  ├── GET /api/jobs (Search jobs)
  ├── GET /api/jobs/{id} (Job details)
  ├── POST /api/jobs/recommendation (Match scores)
  ├── POST /api/jobs/predict-salary (Salary prediction)
  └── GET /api/jobs/stats (Market statistics)

- admin.py (Admin API)
  ├── POST /api/admin/refresh-data (Data refresh)
  ├── GET /api/admin/health (Health check)
  └── GET /api/admin/stats (Detailed stats)

### Models Layer (models/)
- database.py (SQLAlchemy ORM)
  ├── JobListing model
  ├── JobAnalysis model
  ├── JobSkill model
  └── UserPreference model

- schemas.py (Pydantic validation)
  ├── JobListingCreate/Response
  ├── JobSearchQuery
  ├── MLPredictionRequest/Response
  ├── DashboardStats
  └── Other schemas

- ml_models.py (ML/AI)
  ├── SalaryPredictionModel
  │   └── RandomForestRegressor for salary
  ├── JobRecommendationModel
  │   └── Calculates match scores
  └── SkillTrendModel
      └── Analyzes skill demand

- responses.py (Response models)
  ├── SuccessResponse
  ├── ErrorResponse
  ├── PaginatedResponse
  └── MetricsResponse

- database_config.py
  └── Database connection management

### Data Pipeline (pipelines/)
- data_pipeline.py
  ├── JobScraperBase (Abstract scraper)
  ├── RemoteJobsScraperAPI (RemoteOK integration)
  ├── LinkedInScraperSimulation (Sample data generator)
  ├── DataProcessor (Cleaning & enrichment)
  └── DataPipeline (Orchestrator)

### Utilities (utils/)
- database.py (DB operations)
  ├── insert_jobs()
  ├── get_all_jobs()
  ├── search_jobs()
  └── get_statistics()

- logging.py (Production logging)
  └── setup_logging() → JSON logs

- security.py (Security utilities)
  ├── verify_api_key()
  ├── hash_password()
  ├── verify_password()
  └── rate_limit_decorator()

- migrations.py (DB migrations)
  ├── create_indexes()
  └── init_sample_data()

- scheduler.py (Background jobs)
  ├── JobScheduler class
  ├── Refresh jobs every 6 hours
  └── Update models every 24 hours

### Tests (tests/)
- test_models.py
  ├── TestSalaryPredictionModel
  └── TestJobRecommendationModel

- test_api.py
  ├── test_health_check()
  ├── test_get_stats()
  └── test_search_jobs()

### Entry Point
- main.py
  ├── Creates FastAPI app
  ├── Includes routers
  └── Defines root endpoint

### Configuration
- config.py (Settings management)
  └── Environment-based configuration

---

## ☸️ DEPLOYMENT & INFRASTRUCTURE

### Docker
- Dockerfile.backend
  ├── Python 3.11 slim base
  ├── Install dependencies
  ├── Copy code
  └── Run uvicorn server

- Dockerfile.frontend
  ├── Multi-stage build
  ├── Node 20 builder
  ├── Production nginx
  └── Serve built app

- docker-compose.yml
  ├── backend service (port 8000)
  ├── frontend service (port 3000)
  ├── postgres service (port 5432)
  └── Volume management

### Kubernetes
- k8s-deployment.yaml
  ├── Namespace
  ├── ConfigMap
  ├── Backend Deployment (3 replicas)
  ├── Backend Service
  ├── Frontend Deployment (2 replicas)
  ├── Frontend Service
  └── Horizontal Pod Autoscaler

### AWS/Terraform
- terraform/main.tf
  ├── VPC setup
  ├── Public subnets
  ├── Application Load Balancer
  ├── RDS PostgreSQL
  ├── ECR repositories
  ├── ECS cluster
  ├── S3 bucket
  └── CloudFront distribution

- terraform/variables.tf
  ├── AWS region
  ├── DB credentials
  └── Environment

### CI/CD
- .github/workflows/ci-cd.yml
  ├── test-backend job
  ├── test-frontend job
  ├── build-and-push job
  └── deploy job

### Additional Config
- nginx.conf (Production reverse proxy)
  ├── HTTPS/SSL
  ├── API routing
  ├── Static file caching
  └── Security headers

- deploy.sh (AWS deployment script)
  └── Automated deployment to ECS

---

## 📚 DOCUMENTATION

- START_HERE.md (Quick orientation)
- INDEX.md (Documentation hub)
- README.md (Full documentation)
- QUICK_START.md (Setup instructions)
- PROJECT_SUMMARY.md (Features & accomplishments)
- DEPLOYMENT_CHECKLIST.md (Pre-deployment checklist)
- OPTIMIZATION.md (Performance guide)
- MANIFEST.md (File listing)

---

## 🔧 CONFIGURATION FILES

- .env (Environment variables)
- .gitignore (Git ignore rules)
- vite.config.ts (Frontend build)
- tsconfig.json (TypeScript config)
- tailwind.config.js (Tailwind CSS)
- package.json (NPM dependencies)

---

## 📊 DATABASE SCHEMA

### Tables
1. **job_listings** (Main job data)
   - id, title, company, location, job_url
   - description, salary_min, salary_max
   - job_type, experience_level, skills_required
   - remote_type, posted_date, source
   - salary_score, growth_potential, match_score
   - created_at, updated_at

2. **job_analysis** (Analytics data)
   - id, metric_name, metric_value
   - category, time_period, created_at

3. **job_skills** (Skill tracking)
   - id, skill_name, frequency
   - average_salary_impact, trend_direction
   - last_updated

4. **user_preferences** (User data)
   - id, user_id, saved_jobs, preferences
   - created_at, updated_at

### Indexes
- job_listings(title, company, remote_type)
- job_listings(salary_min, salary_max)
- job_listings(posted_date)
- job_skills(frequency DESC)

---

## 🧠 ML PIPELINE

### Salary Prediction
1. Feature extraction:
   - Experience level (encoded 0-1)
   - Skills count
   - Remote type bonus (1.15x)
   - Company tier score
   - Location tier score

2. Model: RandomForestRegressor
3. Training: Historical data
4. Prediction: Returns (min, max) salary range

### Recommendation Engine
1. Calculate sub-scores:
   - Experience match (25%)
   - Skills match (30%)
   - Salary match (20%)
   - Location match (15%)
   - Remote match (10%)

2. Output: Match score 0-1

### Growth Potential
1. Company type analysis
2. Skill development opportunities
3. Career advancement potential

### Skill Trends
1. Frequency analysis
2. Salary impact calculation
3. Trend direction (up/down/stable)

---

## 🔄 DATA FLOW

1. **Data Collection**
   ↓
   Job Scraper (LinkedIn, RemoteOK)
   ↓
   Data Processor (Clean, Normalize)
   ↓

2. **Storage**
   ↓
   PostgreSQL Database
   ↓

3. **ML Processing**
   ↓
   Feature Extraction
   ↓
   ML Models (Training/Prediction)
   ↓

4. **API Layer**
   ↓
   FastAPI Routes (Search, Recommend, Predict)
   ↓
   JSON Responses

5. **Frontend**
   ↓
   React Components
   ↓
   User Display

---

## 📈 SCALABILITY ARCHITECTURE

### Horizontal Scaling
- Kubernetes: 2-10 pod replicas
- Auto-scaling based on CPU usage
- Load balancing via ALB/Service

### Vertical Scaling
- Database: RDS multi-AZ
- Connection pooling: 20 connections, 40 overflow
- Cache: Redis-ready (future addition)

### Performance
- Database indexes for queries
- Connection recycling every 1 hour
- GZIP compression
- CDN caching (CloudFront)

---

## 🔒 SECURITY LAYERS

- **HTTP**: HTTPS/TLS enforced
- **API**: CORS configured
- **Data**: Input validation (Pydantic)
- **Database**: SQLAlchemy ORM (SQL injection prevention)
- **Secrets**: Environment variables + AWS Secrets Manager
- **Logs**: Structured JSON logging
- **Headers**: Security headers configured

---

## 🎯 COMPONENT RELATIONSHIPS

```
Frontend (React)
    ↓
Navbar component navigates to:
    ├─→ Dashboard
    │    └─→ API calls to /api/jobs/stats
    ├─→ Job Listings
    │    ├─→ API calls to /api/jobs (search)
    │    └─→ JobCard shows match_score (/api/jobs/recommendation)
    └─→ Analytics
         └─→ API calls to /api/admin/stats

Backend (FastAPI)
    ├─→ Database (SQLAlchemy ORM)
    ├─→ ML Models (Scikit-learn)
    ├─→ Data Pipeline (Scraping)
    ├─→ Scheduler (Background jobs)
    └─→ Utils (Logging, Security)

Infrastructure
    ├─→ Docker (Containerization)
    ├─→ Kubernetes (Orchestration)
    ├─→ AWS (Cloud)
    ├─→ Terraform (IaC)
    └─→ GitHub Actions (CI/CD)
```

---

## ✨ EVERYTHING IS CONNECTED

Each component serves a purpose:
- Frontend: User interface & interaction
- Backend: Business logic & ML
- Database: Data persistence
- Infrastructure: Deployment & scaling
- Documentation: Understanding & reproduction

**All components work together to create a production-ready platform!**

---

🎉 **You have a complete, professional ML/Data Engineering project!**
