# 🚀 Complete Frontend & Backend Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (optional but recommended)

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies
```bash
cd c:\Users\AR\Downloads\project
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

**Access:** http://localhost:5173 (Vite dev server)

### Step 3: Build for Production
```bash
npm run build
```

**Output:** `dist/` folder ready for deployment

---

## 🐍 Backend Setup

### Option A: Docker (Recommended)

#### Start All Services
```bash
cd c:\Users\AR\Downloads\project
docker-compose up -d
```

**Services Running:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: PostgreSQL on port 5432

#### Stop Services
```bash
docker-compose down
```

### Option B: Local Python Environment

#### 1. Create & Activate Virtual Environment
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

#### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Set up Environment Variables
Create `.env` file in project root:
```env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/remote_jobs
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=your-dev-secret-key
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost
API_PORT=8000
```

#### 4. Setup Database (if not using Docker)
```bash
# Create PostgreSQL database
createdb remote_jobs -U postgres

# Run migrations
alembic upgrade head
```

#### 5. Start Backend Server
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Access:** http://localhost:8000/docs (API Documentation)

---

## 📋 Complete Startup Sequence

### Full Stack with Docker (Recommended)

#### Terminal 1: Start Backend & Database
```bash
docker-compose up -d postgres backend
# Wait 10 seconds for database to be ready
```

#### Terminal 2: Start Frontend Dev Server
```bash
npm run dev
```

#### Terminal 3: Frontend Build (optional)
```bash
npm run build
docker-compose up -d frontend
```

---

## ✅ Verification Checklist

### Frontend
- [ ] `npm run typecheck` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no linting errors)
- [ ] Dev server runs: `npm run dev`
- [ ] Production build works: `npm run build`
- [ ] Can access http://localhost:5173 or http://localhost:3000

### Backend
- [ ] API server running on port 8000
- [ ] API docs accessible: http://localhost:8000/docs
- [ ] Database connection established
- [ ] Health check endpoint: `GET http://localhost:8000/api/admin/health`

### Database
- [ ] PostgreSQL running on port 5432
- [ ] Database `remote_jobs` created
- [ ] Tables initialized

---

## 🐛 Common Issues & Fixes

### Issue 1: Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Kill process (macOS/Linux)
lsof -ti :3000 | xargs kill -9
```

### Issue 2: npm install fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue 3: Database Connection Error
```bash
# Check PostgreSQL is running
docker-compose ps

# Verify database exists
psql -U postgres -l

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

### Issue 4: Backend API not responding
```bash
# Check logs
docker-compose logs backend

# Or if running locally
# Kill any running uvicorn process and restart
```

---

## 📊 Project Structure

```
project/
├── src/                    # React Frontend
│   ├── components/        # React Components
│   ├── context/          # Context API
│   ├── App.tsx           # Main App
│   └── main.tsx          # Entry point
├── backend/              # Python Backend
│   ├── api/             # FastAPI routes
│   ├── models/          # Database models
│   ├── main.py          # Entry point
│   └── requirements.txt  # Python deps
├── public/              # Static assets
├── docker-compose.yml   # Docker setup
├── Dockerfile.frontend  # Frontend build
├── Dockerfile.backend   # Backend build
└── package.json        # Node dependencies
```

---

## 🎯 Key Commands Reference

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
```

### Backend
```bash
uvicorn main:app --reload           # Dev server
pytest                              # Run tests
alembic upgrade head                # Apply migrations
alembic revision --autogenerate     # Create migration
```

### Docker
```bash
docker-compose up -d               # Start all services
docker-compose down                # Stop all services
docker-compose logs -f             # View logs
docker-compose ps                  # Check status
docker-compose down -v             # Remove volumes
```

---

## 🌐 API Endpoints

### Health Check
```
GET /
GET /api/admin/health
```

### Jobs
```
GET /api/jobs/search
GET /api/jobs/stats
POST /api/jobs/filter
```

### Analytics
```
GET /api/analytics/trends
GET /api/analytics/salaries
GET /api/analytics/skills
```

---

## 📦 Deployment

### Docker Build
```bash
# Build images
docker build -f Dockerfile.frontend -t portfolio:frontend .
docker build -f Dockerfile.backend -t portfolio:backend .

# Run containers
docker run -p 3000:3000 portfolio:frontend
docker run -p 8000:8000 portfolio:backend
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods
kubectl get svc
```

### Terraform (AWS)
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

---

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=change-in-production
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
API_PORT=8000
```

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **PROJECT_SUMMARY.md** - Feature breakdown
- **QUICK_START.md** - Quick start guide
- **DEPLOYMENT_CHECKLIST.md** - Production checklist
- **PROJECT_ANALYSIS.md** - Code analysis report

---

## 🎓 Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Start development server (`npm run dev`)
3. ✅ Start backend (`docker-compose up` or local uvicorn)
4. ✅ Verify API endpoints work
5. ✅ Make your customizations
6. ✅ Build for production (`npm run build`)
7. ✅ Deploy to your hosting

---

## 💡 Tips & Best Practices

- **Hot Reload:** Frontend auto-updates on file changes
- **Type Safety:** Run `npm run typecheck` before committing
- **Linting:** Run `npm run lint` to find code issues
- **Testing:** Run `pytest` to verify backend functionality
- **Logging:** Check `docker-compose logs` for debugging

---

## 🆘 Support & Troubleshooting

### Get Help
1. Check the logs: `docker-compose logs -f`
2. Verify ports are available: `netstat -ano` (Windows) or `lsof -i` (Mac/Linux)
3. Clear cache: `npm cache clean --force`
4. Restart services: `docker-compose restart`

### Contact
For issues or questions, refer to the individual service documentation files.

---

**Status:** ✅ Ready for Development  
**Last Updated:** January 22, 2026
