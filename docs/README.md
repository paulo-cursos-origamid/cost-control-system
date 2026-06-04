# CCP — Documentation Hub

## Overview

This directory contains the complete technical documentation for the CCP platform.

CCP is a personal financial management platform focused on:

* financial control
* credit card management
* vehicle expense management
* recurring billing
* ledger accounting
* financial automation
* future SaaS scalability

---

# Documentation Structure

## API

Technical API documentation.

Location:

```text
docs/api
```

Includes:

* authentication
* accounts
* transactions
* transfers
* invoices
* credit cards

---

## Architecture

System architecture documentation.

Location:

```text
docs/architecture
```

Includes:

* backend architecture
* database architecture
* financial engine
* security
* multi-tenant future architecture

---

## Business Rules

Core business logic and financial rules.

Location:

```text
docs/business-rules
```

Includes:

* invoices
* transfers
* ledger rules
* recurring transactions
* installments
* vehicle rules

---

## Modules

Detailed module documentation.

Location:

```text
docs/modules
```

Each module contains:

* responsibilities
* endpoints
* integrations
* workflows
* business rules
* architecture decisions

---

## Workflows

Critical financial workflows.

Location:

```text
docs/workflows
```

Includes:

* transaction creation flow
* transfer flow
* invoice closing flow
* recurring transaction flow
* credit card purchase flow

---

## Deployment

Infrastructure and deployment documentation.

Location:

```text
docs/deployment
```

Includes:

* Docker
* EC2
* environment variables
* production checklist

---

## Status

Project status and roadmap tracking.

Location:

```text
docs/status
docs/roadmap
```

---

# Backend Stack

Main technologies:

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Swagger
* Docker

---

# Frontend Stack

Main technologies:

* Next.js
* TypeScript
* TailwindCSS
* React Context
* App Router

---

# Architecture Philosophy

The platform follows:

* modular architecture
* scalable financial engine
* ledger-first consistency
* domain-oriented design
* SaaS-ready structure

---

# Financial Engine Principles

Core principles:

* immutable ledger entries
* atomic financial operations
* full auditability
* balance consistency
* ownership isolation

---

# Security Principles

Security model includes:

* JWT authentication
* role-based authorization
* ownership validation
* DTO validation
* protected financial operations

---

# Current Status

Backend:
✅ Advanced

Financial engine:
✅ Stable

Frontend:
🚧 In development

Infrastructure:
🚧 Partial

SaaS architecture:
🚧 Planned

---

# Future Goals

Planned future improvements:

* multi-tenant SaaS
* Stripe integration
* subscription billing
* team workspaces
* advanced analytics
* real-time notifications
* queues and workers

---

# Maintainers

Project maintained by:

CCP Engineering
