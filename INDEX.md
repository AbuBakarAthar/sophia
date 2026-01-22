# 🎯 USA Remote Jobs ML Platform - Complete Project

## 📖 Documentation Index

Start here based on your needs:

### 🚀 Quick Start
- **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes
- **[README.md](README.md)** - Full project documentation

### 📊 Understanding the Project
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview and accomplishments
- **[Architecture Guide](README.md#-project-overview)** - System design

### 💻 Development
- **[Backend Setup](#backend-setup)** - Python/FastAPI
- **[Frontend Setup](#frontend-setup)** - React/TypeScript
- **Local Testing** - See QUICK_START.md

### ☁️ Deployment
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-deployment steps
- **[Docker](#docker)** - Container deployment
- **[Kubernetes](#kubernetes)** - K8s deployment
- **[AWS/Terraform](#aws-deployment)** - Cloud deployment
- **[deploy.sh](deploy.sh)** - Automated AWS deployment

### 🎓 Learning
- **[OPTIMIZATION.md](OPTIMIZATION.md)** - Performance best practices
- **[API Documentation](#api-docs)** - Endpoint reference
- **[ML Models](#ml-models)** - Model descriptions

---

## 🛠️ Quick Commands

### Backend Setup
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
```

### Frontend Setup
```bash
npm install
```

### Run Locally
```bash
# Option 1: Docker Compose (recommended)
docker-compose up --build

# Option 2: Manual
# Terminal 1
cd backend && uvicorn main:app --reload

# Terminal 2
npm run dev
```

### Access
- 🎨 Frontend: http://localhost:5173 or http://localhost:3000
- 🔌 API: http://localhost:8000
- 📚 Docs: http://localhost:8000/docs

### Populate Data
```bash
curl -X POST http://localhost:8000/api/admin/refresh-data
```

### Tests
```bash
# Backend
pytest backend/tests/ -v

# Frontend
npm run lint
npm run typecheck
npm run build
```

---

## 📁 Project Structure at a Glance

```
backend/           # Python FastAPI application
├── api/           # REST endpoints
├── models/        # ML models & database
├── pipelines/     # Data ETL
├── utils/         # Utilities
├── tests/         # Test suite
└── main.py        # Entry point

src/               # React frontend
├── components/    # React components
├── config.ts      # Configuration
└── App.tsx        # Main component

terraform/         # AWS infrastructure
k8s-deployment.yaml  # Kubernetes config
docker-compose.yml   # Local dev setup
```

---

## 🚀 Deployment Quick Reference

### Docker
```bash
docker build -f Dockerfile.backend -t backend .
docker run -p 8000:8000 backend
```

### Kubernetes
```bash
kubectl apply -f k8s-deployment.yaml
kubectl get svc -n remote-jobs
```

### AWS (Terraform)
```bash
cd terraform
terraform init
terraform apply -var-file=prod.tfvars
```

### Automated AWS Deployment
```bash
./deploy.sh
```

---

## 🧠 Key Features

### Frontend
✅ Responsive dashboard with statistics
✅ Advanced job search with filters
✅ Market analytics and trends
✅ Beautiful UI with Tailwind CSS

### Backend
✅ FastAPI with async endpoints
✅ ML-powered job recommendations
✅ Salary prediction model
✅ Skill trend analysis
✅ Data pipeline for job scraping

### ML/AI
✅ Salary predictions (RandomForest)
✅ Job matching algorithm
✅ Growth potential scoring
✅ Skill demand analysis

### Infrastructure
✅ Docker containerization
✅ Kubernetes orchestration
✅ AWS cloud deployment
✅ Terraform IaC
✅ GitHub Actions CI/CD

---

## 📊 API Reference

### Job Search
```bash
GET /api/jobs?keyword=python&experience_level=mid&limit=20
```

### Job Details
```bash
GET /api/jobs/{job_id}
```

### Recommendations
```bash
POST /api/jobs/recommendation
{
  "job_id": "linkedin_0",
  "user_preferences": {...}
}
```

### Salary Prediction
```bash
POST /api/jobs/predict-salary?job_id=linkedin_0
```

### Market Stats
```bash
GET /api/jobs/stats
```

See [README.md](README.md#-api-endpoints) for full API docs.

---

## 🔗 Important Links

### Documentation
- [Full README](README.md)
- [Project Summary](PROJECT_SUMMARY.md)
- [Quick Start](QUICK_START.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [Optimization Guide](OPTIMIZATION.md)

### Configuration Files
- [.env](.env) - Environment variables
- [docker-compose.yml](docker-compose.yml) - Local setup
- [k8s-deployment.yaml](k8s-deployment.yaml) - Kubernetes
- [Dockerfile.backend](Dockerfile.backend) - Backend image
- [Dockerfile.frontend](Dockerfile.frontend) - Frontend image

### Scripts
- [deploy.sh](deploy.sh) - AWS deployment script

---

## 🎯 Next Steps

1. **Explore the Code** - Check out the backend and frontend implementations
2. **Run Locally** - Follow QUICK_START.md to get running
3. **Deploy** - Use deployment options above
4. **Customize** - Add your own ML models or features
5. **Scale** - Deploy to AWS/GCP for production

---

## 📞 Support & Troubleshooting

See the relevant documentation files:
- Setup issues → [QUICK_START.md](QUICK_START.md)
- Deployment issues → [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- Performance issues → [OPTIMIZATION.md](OPTIMIZATION.md)
- API issues → [README.md](README.md#-api-endpoints)

---

## ✨ Project Highlights

🎓 **Production-Ready** - All best practices implemented
🚀 **Fully Scalable** - From local dev to cloud production
🤖 **AI-Powered** - ML models for predictions and recommendations
☁️ **Cloud Native** - AWS, Kubernetes, Infrastructure as Code
🔒 **Secure** - Security headers, input validation, secrets management
📊 **Data-Driven** - Complete analytics and market insights
📱 **Responsive** - Beautiful UI that works on all devices
🧪 **Tested** - Unit and integration tests included
📝 **Documented** - Comprehensive documentation throughout

---

**Ready to showcase this project? Start with [QUICK_START.md](QUICK_START.md)! 🚀**
