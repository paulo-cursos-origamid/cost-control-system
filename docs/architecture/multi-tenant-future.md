# Multi Tenant Future Architecture

## Overview

The CCP platform is currently designed as a single-tenant financial system.

However, the internal architecture was intentionally created to support future migration to a full SaaS multi-tenant platform.

This document describes:

* future tenant architecture
* workspace isolation
* billing strategy
* scalability planning
* security isolation
* enterprise readiness

---

# Current Architecture Status

Current state:

✅ Single database
✅ User ownership isolation
✅ JWT authentication
✅ Modular architecture
✅ Service-based design
✅ Financial consistency engine

The current foundation already supports future tenant expansion.

---

# Future SaaS Goals

Planned SaaS capabilities:

* multiple organizations
* isolated workspaces
* subscription plans
* team management
* role-based access control
* billing integration
* enterprise features
* audit compliance
* scalable infrastructure

---

# Planned Tenant Model

Future entity structure:

```text
Tenant
 ├── Users
 ├── Accounts
 ├── Transactions
 ├── Vehicles
 ├── Credit Cards
 ├── Reports
 ├── Audit Logs
 └── Settings
```

Each tenant will represent:

* a company
* a family
* an organization
* an accounting workspace
* a personal workspace

---

# Planned Database Strategy

## Initial Multi-Tenant Strategy

The initial SaaS strategy will likely use:

```text
Shared Database
Shared Schema
Tenant Isolation by tenantId
```

Example:

```text
transactions
 ├── id
 ├── tenantId
 ├── userId
 ├── amount
 └── type
```

Advantages:

* lower infrastructure cost
* easier maintenance
* simpler deployment
* faster scaling

---

# Future Enterprise Strategy

Large enterprise customers may require:

```text
Dedicated Database per Tenant
```

Possible architecture:

```text
Tenant A → Database A
Tenant B → Database B
Tenant C → Database C
```

Advantages:

* stronger isolation
* enterprise compliance
* easier backups
* regulatory support

---

# Workspace System

Future workspace structure:

```text
Workspace
 ├── Owner
 ├── Members
 ├── Roles
 ├── Permissions
 └── Billing Plan
```

Users may belong to:

* personal workspace
* family workspace
* company workspace
* accounting office

---

# Team Roles

Future RBAC model:

| Role       | Description                |
| ---------- | -------------------------- |
| OWNER      | Full system access         |
| ADMIN      | Administrative access      |
| MANAGER    | Financial management       |
| ACCOUNTANT | Reports and reconciliation |
| MEMBER     | Limited operations         |
| VIEWER     | Read-only access           |

---

# Tenant Isolation Rules

Critical isolation rules:

* users only access their own tenant
* reports are tenant-scoped
* financial engines operate per tenant
* invoices are isolated per tenant
* audit logs remain tenant-specific
* caching must be tenant-aware

---

# Authentication Evolution

Current authentication:

```text
JWT + User Ownership
```

Future authentication:

```text
JWT + Tenant Context + Workspace Context
```

Future JWT payload example:

```json
{
  "sub": "user-id",
  "tenantId": "tenant-id",
  "workspaceId": "workspace-id",
  "role": "ADMIN"
}
```

---

# Billing Architecture

Planned billing provider:

* Stripe

Future billing features:

* monthly subscriptions
* yearly subscriptions
* usage-based billing
* workspace plans
* enterprise plans
* invoice generation
* payment retries

---

# Planned SaaS Plans

Possible plans:

| Plan       | Features                 |
| ---------- | ------------------------ |
| Free       | Basic personal finance   |
| Pro        | Advanced reports         |
| Team       | Shared workspace         |
| Business   | Multi-user management    |
| Enterprise | Dedicated infrastructure |

---

# Infrastructure Scaling

Future infrastructure strategy:

## Current

```text
Single Backend Instance
Single PostgreSQL Database
```

## Future

```text
Load Balancer
 ├── API Instances
 ├── Worker Instances
 ├── Scheduler Instances
 └── Queue Workers
```

---

# Queue Architecture

Future queue usage:

* recurring transactions
* notifications
* invoice generation
* exports
* report generation
* email delivery
* webhooks

Planned technologies:

* BullMQ
* Redis
* RabbitMQ

---

# Notification System

Future notifications:

* email alerts
* invoice reminders
* overdue alerts
* push notifications
* websocket updates

---

# Audit & Compliance

Enterprise compliance goals:

* immutable audit logs
* action tracking
* login history
* financial traceability
* exportable audit reports

Future compliance targets:

* LGPD
* GDPR
* SOC2 readiness

---

# Security Considerations

Critical SaaS security requirements:

* tenant isolation
* encrypted secrets
* secure JWT rotation
* rate limiting
* audit trails
* RBAC enforcement
* workspace isolation

---

# Future Frontend Architecture

Frontend evolution may include:

```text
workspace.domain.com
```

Examples:

```text
acme.ccp.app
family.ccp.app
office.ccp.app
```

---

# Migration Strategy

Migration path:

## Phase 1

Current single-tenant platform

## Phase 2

Add tenantId to entities

## Phase 3

Workspace management

## Phase 4

Billing integration

## Phase 5

Enterprise infrastructure

---

# Challenges

Expected challenges:

* data migration
* tenant isolation
* caching complexity
* RBAC expansion
* billing synchronization
* infrastructure cost
* audit compliance

---

# Current Readiness

Current SaaS readiness:

| Area                   | Status |
| ---------------------- | ------ |
| Modular backend        | ✅      |
| Financial engine       | ✅      |
| JWT auth               | ✅      |
| Ownership validation   | ✅      |
| Role system            | ✅      |
| Multi-tenant isolation | 🚧     |
| Billing                | 🚧     |
| Workspace system       | 🚧     |
| Enterprise compliance  | 🚧     |

---

# Long-Term Vision

Long-term goals:

* enterprise financial platform
* accounting workspace system
* fleet management platform
* multi-user finance collaboration
* SaaS-ready infrastructure
* scalable cloud architecture

---

# Status

Current status:

🚧 Planned

Architecture readiness:

✅ Strong foundation

SaaS migration capability:

✅ Feasible

Enterprise readiness:

🚧 In progress
