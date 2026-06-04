# AWS EC2 Deployment

## Overview

The CCP platform is designed to run on AWS EC2 using Docker containers.

The infrastructure prioritizes:

* low operational cost
* scalability
* security
* container isolation
* future migration to ECS/Fargate

---

# Current Infrastructure Strategy

Current deployment model:

```text id="5m7d1q"
AWS EC2
    ↓
Docker Compose
    ↓
Containers
    ├── backend
    ├── frontend
    ├── postgres
    ├── rabbitmq
    └── nginx
```

---

# AWS Region

Current preferred region:

```text id="n3v8ka"
us-east-1
(North Virginia)
```

Reasons:

* lower AWS costs
* high availability
* ECS/Fargate support
* broad service compatibility

---

# EC2 Instance Strategy

Initial strategy:

* single EC2 instance
* Docker Compose orchestration
* internal container networking

Future strategy:

* ECS cluster
* Fargate containers
* auto scaling

---

# Recommended Instance Types

## Development

| Instance | Purpose              |
| -------- | -------------------- |
| t3.micro | testing              |
| t3.small | personal development |

---

## Production

| Instance  | Purpose           |
| --------- | ----------------- |
| t3.medium | small production  |
| t3.large  | medium production |
| c6a.large | compute optimized |

---

# Operating System

Recommended AMI:

```text id="9v2zpc"
Amazon Linux 2023
```

Reasons:

* AWS optimized
* lightweight
* Docker friendly
* low maintenance

---

# Network Architecture

Recommended architecture:

```text id="u5x1rq"
VPC
 ├── Public Subnet
 │      └── EC2
 │
 └── Private Internal Services
```

---

# Security Groups

## Public Access

Allowed public ports:

| Port | Purpose |
| ---- | ------- |
| 80   | HTTP    |
| 443  | HTTPS   |
| 22   | SSH     |

---

## Internal Ports

Internal-only ports:

| Port  | Service             |
| ----- | ------------------- |
| 5432  | PostgreSQL          |
| 5672  | RabbitMQ            |
| 15672 | RabbitMQ Management |
| 3000  | Backend             |
| 3001  | Frontend            |

---

# Reverse Proxy

Nginx acts as the public entry point.

Responsibilities:

* HTTPS termination
* reverse proxy
* static delivery
* request routing

---

# Database Security

PostgreSQL should NEVER be publicly exposed.

Rules:

* private network only
* restricted container access
* backup enabled
* strong credentials

---

# RabbitMQ Security

RabbitMQ management panel should remain private.

Recommended:

* no public exposure
* internal access only
* optional VPN access

---

# Elastic IP

Production EC2 instances should use:

```text id="8r5qmu"
Elastic IP
```

Benefits:

* stable public IP
* DNS consistency
* easier migrations

---

# DNS Strategy

Recommended DNS providers:

* Route53
* Cloudflare

Example domains:

```text id="v6n1ka"
api.ccp.com
app.ccp.com
```

---

# SSL Certificates

Recommended HTTPS strategy:

* Let's Encrypt
* Certbot
* automatic renewal

---

# Persistent Storage

Persistent data should include:

| Data       | Persistence |
| ---------- | ----------- |
| PostgreSQL | EBS volume  |
| uploads    | EBS volume  |
| backups    | S3          |

---

# Backup Strategy

Recommended backups:

* automated PostgreSQL dumps
* EBS snapshots
* S3 backup storage

---

# Deployment Flow

Recommended production flow:

```text id="k0u2bp"
GitHub
    ↓
EC2 Pull
    ↓
Docker Build
    ↓
Docker Compose Up
```

---

# Monitoring

Recommended monitoring tools:

* CloudWatch
* Grafana
* Prometheus

---

# Logging

Recommended logging:

* application logs
* access logs
* financial operation logs
* scheduler logs

---

# SSH Security

SSH recommendations:

* disable password login
* key-only authentication
* custom SSH users
* fail2ban

---

# Scalability Strategy

Future scalable architecture:

```text id="x7c4rl"
Load Balancer
      ↓
Multiple Backend Containers
      ↓
Dedicated Database
```

---

# Future ECS Migration

Planned migration path:

| Current        | Future  |
| -------------- | ------- |
| Docker Compose | ECS     |
| Single EC2     | Fargate |
| Local volumes  | EFS/S3  |

---

# Cost Optimization

Strategies:

* t-series instances
* container consolidation
* reserved instances
* autoscaling in future

---

# CI/CD Future

Planned pipeline:

```text id="b3m8vn"
GitHub Actions
      ↓
Docker Build
      ↓
ECR Push
      ↓
EC2/ECS Deploy
```

---

# Disaster Recovery

Recommended recovery strategy:

* automated backups
* infrastructure documentation
* image versioning
* database snapshots

---

# Future Improvements

Planned improvements:

* ECS migration
* blue-green deployment
* auto scaling
* service mesh
* infrastructure as code

---

# Status

EC2 strategy:
✅ Defined

Docker deployment:
✅ Operational

Production hardening:
🚧 Partial

ECS migration:
🚧 Planned
