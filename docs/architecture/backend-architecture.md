# Backend Architecture

## Overview

The CCP backend is built using:

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Modular Monolith Architecture

The backend is designed to support:

* Personal financial management
* Multi-account systems
* Vehicle cost management
* Credit card management
* Recurring financial automation
* Ledger accounting
* Audit trails
* Future SaaS multi-tenant architecture

---

# Core Architecture

The system follows a modular architecture.

Each domain is isolated into its own module.

Example:

```txt
src/modules/
```

Modules:

* auth
* users
* accounts
* transactions
* ledger
* transfers
* vehicles
* reports
* recurring-transactions
* financial-engine
* financial-scheduler

---

# Financial Architecture

The financial system is ledger-based.

Every financial mutation generates accounting entries.

Core principles:

* immutable financial history
* auditability
* transactional consistency
* traceability
* double-entry preparation

---

# Authentication

Authentication uses:

* JWT access tokens
* role-based access control
* guards
* decorators

Roles:

* ADMIN
* USER

Future:

* RBAC
* permissions
* SaaS workspace isolation

---

# Database

Database:

* PostgreSQL

ORM:

* Prisma

Patterns:

* transactional consistency
* normalized financial structure
* scalable relation mapping

---

# Scheduler Architecture

The scheduler system is responsible for:

* recurring transactions
* invoice generation
* overdue automation
* financial automation

---

# Future Architecture

Planned future improvements:

* SaaS multi-tenancy
* Stripe integration
* queues
* websocket notifications
* event-driven architecture
* microservices support

---

# Deployment

Current deployment targets:

* Docker
* EC2
* Railway
* Future ECS/Fargate

---

# Scalability

Current architecture supports:

* modular scaling
* horizontal scaling
* queue-based workloads
* async financial processing

---

# Status

Backend foundation:
STRONG

Financial engine:
SOLID

Scalability:
READY
