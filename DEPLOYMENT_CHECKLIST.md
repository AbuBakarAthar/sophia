# Production deployment checklist

## Pre-Deployment
- [ ] All tests passing (pytest backend/tests/)
- [ ] Frontend build succeeds (npm run build)
- [ ] No security vulnerabilities (pip audit, npm audit)
- [ ] Environment variables configured (.env.production)
- [ ] Database migrations tested
- [ ] API documentation reviewed (/docs)

## Docker Build
- [ ] Backend image builds successfully
- [ ] Frontend image builds successfully
- [ ] Images scanned for vulnerabilities
- [ ] Images tagged with version number
- [ ] Images pushed to ECR

## AWS Deployment
- [ ] VPC and networking configured
- [ ] RDS database provisioned and tested
- [ ] S3 buckets created with proper permissions
- [ ] CloudFront distribution configured
- [ ] ECR repositories created
- [ ] ECS cluster and services configured
- [ ] Load balancer health checks passing
- [ ] Auto-scaling policies configured

## Kubernetes Deployment
- [ ] Cluster created and accessible
- [ ] Namespace created
- [ ] ConfigMaps and Secrets configured
- [ ] Deployments rolling out successfully
- [ ] Services endpoints healthy
- [ ] HPA metrics healthy

## Monitoring & Logging
- [ ] CloudWatch alarms configured
- [ ] Log groups created
- [ ] Health check endpoints responding
- [ ] Performance metrics baseline established

## Security
- [ ] SSL/TLS certificates valid
- [ ] API keys rotated
- [ ] Database credentials in secrets manager
- [ ] WAF rules configured
- [ ] Security groups properly restricted
- [ ] CORS properly configured

## Performance
- [ ] CDN cache policies configured
- [ ] Database query times acceptable
- [ ] API response times < 200ms
- [ ] Frontend bundle size optimized
- [ ] Images optimized

## Post-Deployment
- [ ] Smoke tests passing
- [ ] User acceptance testing complete
- [ ] Documentation updated
- [ ] Rollback plan prepared
- [ ] Support team trained
- [ ] Monitoring dashboards created
