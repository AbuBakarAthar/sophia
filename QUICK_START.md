## Quick Start Guide

### 1. Start Local Development

```bash
# Install dependencies
npm install
pip install -r backend/requirements.txt

# Start with Docker Compose
docker-compose up --build

# Or run separately:
# Terminal 1 - Backend
cd backend && uvicorn main:app --reload

# Terminal 2 - Frontend
npm run dev
```

### 2. Access the Application

- **Frontend**: http://localhost:3000 or http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Swagger UI**: http://localhost:8000/redoc

### 3. Populate Sample Data

```bash
curl -X POST http://localhost:8000/api/admin/refresh-data
```

### 4. Deploy to Production

**Docker**:
```bash
docker-compose -f docker-compose.yml up -d
```

**Kubernetes**:
```bash
kubectl apply -f k8s-deployment.yaml
```

**AWS** (with Terraform):
```bash
cd terraform
terraform init
terraform apply
```

### 5. Run Tests

```bash
# Backend tests
pytest backend/tests/ -v

# Frontend tests & build
npm run lint
npm run typecheck
npm run build
```

### 6. Monitor & Troubleshoot

```bash
# Check backend logs
docker logs -f remote-jobs-backend

# Check frontend
docker logs -f remote-jobs-frontend

# Database status
psql -U postgres -d jobs_db

# API health
curl http://localhost:8000/api/admin/health
```

## Key Features to Explore

1. **Dashboard** - View market statistics and trends
2. **Job Search** - Filter and find remote jobs
3. **ML Recommendations** - Get personalized job matches
4. **Salary Predictions** - Estimate salary ranges
5. **Market Analytics** - Deep insights into job trends

## Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
│    Dashboard | Jobs | Analytics         │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌────────────────▼────────────────────────┐
│       FastAPI Backend (Python)          │
│  Routes | ML Models | Data Pipeline     │
└────────────────┬────────────────────────┘
                 │ SQL
┌────────────────▼────────────────────────┐
│   PostgreSQL Database (SQLAlchemy)      │
│  Jobs | Skills | Analytics | Users      │
└─────────────────────────────────────────┘
```

## Support

For issues:
1. Check README.md
2. Review DEPLOYMENT_CHECKLIST.md
3. Check API docs at /docs
4. Review logs and error messages
5. Create an issue with details

## Next Steps

1. Customize ML models for specific needs
2. Add authentication system
3. Integrate with email/notifications
4. Add advanced filtering
5. Set up data backup strategy
6. Configure monitoring alerts
