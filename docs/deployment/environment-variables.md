# Environment Variables

## Overview

This document describes all environment variables required by the CCP platform.

The system currently includes:

* NestJS backend
* PostgreSQL database
* Prisma ORM
* JWT authentication
* Financial scheduler
* Docker infrastructure
* Future SaaS architecture

---

# Backend Environment Variables

## Application

| Variable | Description         | Example     |
| -------- | ------------------- | ----------- |
| PORT     | Backend server port | 3000        |
| NODE_ENV | Runtime environment | development |
| APP_NAME | Application name    | CCP API     |

---

# Database

## PostgreSQL

| Variable     | Description                       | Example                                   |
| ------------ | --------------------------------- | ----------------------------------------- |
| DATABASE_URL | Prisma database connection string | postgresql://user:pass@localhost:5432/ccp |
| DB_HOST      | Database host                     | localhost                                 |
| DB_PORT      | Database port                     | 5432                                      |
| DB_USERNAME  | Database username                 | postgres                                  |
| DB_PASSWORD  | Database password                 | secret                                    |
| DB_NAME      | Database name                     | ccp                                       |

---

# JWT Authentication

## Security

| Variable               | Description              | Example          |
| ---------------------- | ------------------------ | ---------------- |
| JWT_SECRET             | JWT signing secret       | super_secret_key |
| JWT_EXPIRES_IN         | JWT expiration time      | 7d               |
| JWT_REFRESH_SECRET     | Refresh token secret     | refresh_secret   |
| JWT_REFRESH_EXPIRES_IN | Refresh token expiration | 30d              |

---

# Frontend Integration

## CORS

| Variable     | Description              | Example               |
| ------------ | ------------------------ | --------------------- |
| FRONTEND_URL | Frontend application URL | http://localhost:3001 |
| CORS_ORIGIN  | Allowed CORS origin      | http://localhost:3001 |

---

# Swagger

## API Documentation

| Variable        | Description          | Example |
| --------------- | -------------------- | ------- |
| SWAGGER_ENABLED | Enables Swagger docs | true    |
| SWAGGER_PATH    | Swagger endpoint     | /docs   |

---

# Financial Scheduler

## Automation

| Variable           | Description                 | Example           |
| ------------------ | --------------------------- | ----------------- |
| SCHEDULER_ENABLED  | Enables recurring scheduler | true              |
| SCHEDULER_TIMEZONE | Scheduler timezone          | America/Sao_Paulo |

---

# Logging

## Application Logs

| Variable            | Description           | Example |
| ------------------- | --------------------- | ------- |
| LOG_LEVEL           | Application log level | debug   |
| ENABLE_REQUEST_LOGS | Enables request logs  | true    |

---

# Security

## API Protection

| Variable           | Description             | Example |
| ------------------ | ----------------------- | ------- |
| BCRYPT_ROUNDS      | Password hashing rounds | 10      |
| RATE_LIMIT_ENABLED | Enables rate limiting   | true    |

---

# File Uploads

## Upload Configuration

| Variable           | Description     | Example |
| ------------------ | --------------- | ------- |
| UPLOAD_MAX_SIZE    | Max upload size | 10mb    |
| UPLOAD_DESTINATION | Upload folder   | uploads |

---

# Docker Variables

## Container Environment

| Variable                | Description               | Example |
| ----------------------- | ------------------------- | ------- |
| COMPOSE_PROJECT_NAME    | Docker compose project    | ccp     |
| POSTGRES_CONTAINER_PORT | PostgreSQL container port | 5432    |

---

# Future SaaS Variables

## Multi Tenant

Future variables planned for SaaS mode:

| Variable              | Description               |
| --------------------- | ------------------------- |
| TENANT_MODE_ENABLED   | Enables tenant isolation  |
| DEFAULT_TENANT        | Default tenant identifier |
| STRIPE_SECRET_KEY     | Stripe integration        |
| STRIPE_WEBHOOK_SECRET | Stripe webhook validation |

---

# Production Variables

## Deployment

Production environments should include:

| Variable      | Description          |
| ------------- | -------------------- |
| HTTPS_ENABLED | Enables HTTPS        |
| SSL_CERT_PATH | SSL certificate path |
| SSL_KEY_PATH  | SSL private key path |

---

# Recommended .env Structure

Example:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ccp

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:3001

SWAGGER_ENABLED=true

SCHEDULER_ENABLED=true
SCHEDULER_TIMEZONE=America/Sao_Paulo
```

---

# Environment Separation

Recommended environments:

* development
* staging
* production

Each environment should maintain isolated:

* databases
* secrets
* JWT keys
* logging policies
* infrastructure

---

# Security Recommendations

Important recommendations:

* never commit .env files
* use strong JWT secrets
* rotate production secrets periodically
* isolate production databases
* restrict environment access
* use secret managers in production

---

# Secret Management

Recommended production secret providers:

* AWS Secrets Manager
* AWS Parameter Store
* Docker Secrets
* HashiCorp Vault

---

# Validation Rules

The application should validate:

* missing variables
* invalid values
* malformed database URLs
* insecure configurations

Startup should fail if critical variables are missing.

---

# Future Improvements

Planned improvements:

* environment schema validation
* typed configuration system
* dynamic secret rotation
* centralized config management

---

# Status

Environment configuration:
✅ Operational

Production readiness:
🚧 Partial

Secret rotation:
🚧 Planned

Centralized config:
🚧 Future
