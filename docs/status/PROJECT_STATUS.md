# CCP Backend — Project Status

## Overview

CCP (Centro de Controle Pessoal) é um sistema financeiro pessoal SaaS desenvolvido com:

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger
- Docker

Arquitetura baseada em módulos e regras financeiras reais.

---

# Current Stack

## Backend
- NestJS
- Prisma
- PostgreSQL
- JWT
- Swagger
- Docker

## Infra
- Railway (database)
- AWS EC2 planejado
- Docker Compose
- Nginx planejado

---

# Current Features

## Authentication
- JWT login
- User registration
- Password hashing
- Protected routes

Status:
✅ DONE

---

# Accounts

## Features
- Create account
- Update account
- Soft delete
- Balance recalculation
- Account types

## Supported Types
- CASH
- CHECKING
- SAVINGS
- CREDIT_CARD
- INVESTMENT

Status:
✅ DONE

---

# Categories

## Features
- Create categories
- Default categories
- User categories
- Parent categories
- Vehicle categories

## Supported Types
- INCOME
- EXPENSE

Status:
✅ DONE

---

# Transactions

## Features
- Create transaction
- Update transaction
- Delete transaction
- Restore transaction
- Pagination
- Filters
- Summary
- Ledger integration

## Supported Types
- INCOME
- EXPENSE

Status:
✅ DONE

---

# Ledger Engine

## Features
- Credit entries
- Debit entries
- Balance recalculation
- Transaction references
- Transfer references

## Objective
O Ledger é a fonte real do saldo das contas.

Status:
✅ DONE

---

# Transfers

## Features
- Transfer between accounts
- Double ledger entry
- Balance recalculation

Status:
✅ DONE

---

# Credit Cards

## Features
- Create cards
- Card limits
- Closing day
- Due day
- Invoice generation

Status:
✅ DONE

---

# Credit Card Invoice Engine

## Features
- Automatic invoice generation
- Automatic invoice attachment
- Reference month calculation
- Closing rules
- Invoice payment
- Invoice status management

## Supported Status
- OPEN
- CLOSED
- PAID
- OVERDUE

Status:
✅ DONE

---

# Vehicles

## Features
- Vehicle management
- Mileage tracking

Status:
✅ DONE

---

# Fuel Supply

## Features
- Fuel tracking
- Average consumption
- Full tank logic
- Cost per KM

Status:
✅ DONE

---

# Maintenance

## Features
- Maintenance records
- Next maintenance date
- Next maintenance KM
- Vehicle expenses

Status:
✅ DONE

---

# Reports

## Features
- Financial analytics
- Vehicle analytics
- Expense reports

Status:
🚧 IN PROGRESS

---

# Current Architecture

## Core Financial Flow

Transaction
→ Ledger Entry
→ Account Balance Recalculation

Credit Card Transaction
→ Invoice Engine
→ Credit Card Invoice
→ Invoice Payment
→ Ledger Entry

---

# Important Business Rules

## Ledger
Saldo nunca deve ser alterado manualmente.
Sempre recalculado via ledger.

## Credit Card
Transações de cartão:
- NÃO alteram saldo da conta imediatamente
- entram em invoice
- saldo só altera no pagamento da fatura

## Soft Delete
Entidades financeiras utilizam deletedAt.

---

# Existing Modules

- auth
- users
- accounts
- categories
- transactions
- transfers
- ledger
- recurring-transactions
- installments
- vehicles
- fuel-supplies
- maintenances
- credit-cards
- credit-card-invoices
- reports

---

# Current Branch

```bash
 feature/internal-transfer-engine
 --
 ```
---

# Current Priorities

## Backend
- Roles & Permissions
- Audit logs
- Notifications
- Scheduled jobs
- Recurring transactions automation
- Invoice overdue automation

## Frontend
- Dashboard
- Authentication
- Financial management
- Invoice UI
- Reports
- Vehicle management

---

# Planned Future Features

## SaaS
- Multi tenant
- Subscription billing
- Stripe integration
- Workspace system

## Enterprise
- Teams
- RBAC
- Audit trails
- Advanced analytics

---

# Technical Debt

- Improve tests
- Improve DTO validations
- Add e2e coverage
- Improve caching
- Add queues
- Add websocket notifications

---

# General Status

## Backend foundation
✅ STRONG

## Financial architecture
✅ SOLID

## Scalability
✅ READY

## Frontend
🚧 STARTING

## Deployment
🚧 PARTIAL
```
