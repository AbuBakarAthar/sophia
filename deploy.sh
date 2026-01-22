#!/bin/bash
# Production deployment script for AWS

set -e

echo "🚀 Starting production deployment..."

# Variables
AWS_REGION=${AWS_REGION:-us-east-1}
ECR_REGISTRY=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
IMAGE_TAG=$(git describe --tags --always)

echo "📦 Building Docker images..."
docker build -f Dockerfile.backend -t $ECR_REGISTRY/remote-jobs-backend:$IMAGE_TAG .
docker build -f Dockerfile.frontend -t $ECR_REGISTRY/remote-jobs-frontend:$IMAGE_TAG .

echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

echo "📤 Pushing images to ECR..."
docker push $ECR_REGISTRY/remote-jobs-backend:$IMAGE_TAG
docker push $ECR_REGISTRY/remote-jobs-frontend:$IMAGE_TAG

echo "🔄 Updating ECS services..."
aws ecs update-service \
  --cluster remote-jobs-cluster \
  --service backend \
  --force-new-deployment \
  --region $AWS_REGION

aws ecs update-service \
  --cluster remote-jobs-cluster \
  --service frontend \
  --force-new-deployment \
  --region $AWS_REGION

echo "⏳ Waiting for services to stabilize..."
sleep 30

echo "✅ Deployment complete!"
echo "Image tag: $IMAGE_TAG"
echo "Monitor at: https://console.aws.amazon.com/ecs"
