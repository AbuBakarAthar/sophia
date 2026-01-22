# AWS Infrastructure as Code (Terraform)
# This file demonstrates production-grade AWS deployment

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "remote-jobs-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "remote-jobs-vpc"
  }
}

# Public Subnets
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
}

# ALB
resource "aws_lb" "main" {
  name               = "remote-jobs-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  tags = {
    Name = "remote-jobs-alb"
  }
}

# RDS Database
resource "aws_db_instance" "main" {
  identifier       = "remote-jobs-db"
  engine           = "postgres"
  engine_version   = "15.2"
  instance_class   = "db.t3.micro"
  allocated_storage = 20

  db_name  = "jobsdb"
  username = var.db_username
  password = var.db_password

  skip_final_snapshot       = false
  final_snapshot_identifier = "remote-jobs-final-snapshot"

  tags = {
    Name = "remote-jobs-db"
  }
}

# ECR Repository
resource "aws_ecr_repository" "backend" {
  name                 = "remote-jobs-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "remote-jobs-backend"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "remote-jobs-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "remote-jobs-frontend"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "remote-jobs-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "remote-jobs-cluster"
  }
}

# S3 Bucket for static files
resource "aws_s3_bucket" "static_files" {
  bucket = "remote-jobs-static-files-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name = "remote-jobs-static"
  }
}

resource "aws_s3_bucket_versioning" "static_files" {
  bucket = aws_s3_bucket.static_files.id
  versioning_configuration {
    status = "Enabled"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = aws_s3_bucket.static_files.bucket_regional_domain_name
    origin_id   = "s3Origin"
  }

  enabled = true

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3Origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = "remote-jobs-cdn"
  }
}

data "aws_caller_identity" "current" {}

output "rds_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "ecr_backend_repository" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_repository" {
  value = aws_ecr_repository.frontend.repository_url
}
