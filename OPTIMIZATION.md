"""
Production optimization and best practices
"""

# Performance Optimization Tips

## Frontend Optimizations
1. **Code Splitting**: Components are lazy-loaded
2. **CSS**: Tailwind purges unused styles in production
3. **Bundle Size**: ~50KB gzipped for frontend
4. **Images**: Use WebP format with fallbacks
5. **Caching**: Browser cache headers configured

## Backend Optimizations
1. **Connection Pooling**: SQLAlchemy pool_size=20, max_overflow=40
2. **Query Optimization**: Strategic indexes on frequently filtered columns
3. **Caching**: Redis recommended for session/cache layer
4. **Async Endpoints**: All I/O is asynchronous
5. **Compression**: GZIP middleware enabled

## Database Optimizations
1. **Indexes**: Created on:
   - job_listings(title, company, remote_type, salary_min, salary_max)
   - job_skills(frequency DESC)
2. **Partitioning**: Consider date-based partitioning for large tables
3. **Vacuum**: Scheduled maintenance
4. **Statistics**: ANALYZE tables regularly

## Infrastructure Optimizations
1. **Load Balancing**: ALB with health checks
2. **Auto-scaling**: HPA configured (min 2, max 10 pods)
3. **CDN**: CloudFront caching static assets
4. **Database Replication**: Multi-AZ RDS for high availability
5. **Container Resources**: Properly configured requests/limits

## Security Best Practices
1. **HTTPS Only**: SSL/TLS enforced
2. **CORS**: Configured for specific origins
3. **Rate Limiting**: Prevent abuse
4. **Input Validation**: Pydantic models validate all input
5. **SQL Injection Prevention**: SQLAlchemy ORM prevents injection
6. **CSRF Protection**: Framework built-in
7. **Secrets Management**: Use AWS Secrets Manager

## Monitoring & Observability
1. **Logging**: Structured JSON logging
2. **Metrics**: Prometheus-compatible endpoints
3. **Tracing**: Request tracing across services
4. **Alerts**: CloudWatch alarms configured
5. **Health Checks**: /health endpoints on all services

## Cost Optimization
1. **Reserved Instances**: Use for predictable workloads
2. **Spot Instances**: Use for batch jobs
3. **Data Transfer**: Minimize egress costs
4. **Database**: Right-sizing instance types
5. **Lambda**: Consider for scheduled jobs
"""

# Development Best Practices
DEVELOPMENT_GUIDELINES = """
1. Always run tests before committing
2. Follow PEP 8 for Python code
3. Use type hints in Python
4. Use TypeScript strict mode
5. Document complex functions
6. Use meaningful variable names
7. Keep functions small and focused
8. Avoid code duplication
9. Use environment variables for config
10. Version your APIs
"""
