# Database Architecture

## Overview

The CCP platform uses PostgreSQL as the primary relational database.

The database was designed to support:

* financial consistency
* transactional safety
* auditability
* scalability
* multi-account financial operations
* future SaaS multi-tenancy

The system uses Prisma ORM as the database access layer.

---

# Database Stack

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| PostgreSQL        | Primary relational database |
| Prisma ORM        | Database ORM                |
| Prisma Migrations | Schema versioning           |
| Docker Volume     | Persistent storage          |
| Railway / EC2     | Hosting options             |

---

# Database Design Principles

The database architecture follows these principles:

* normalized relational structure
* strong financial consistency
* immutable ledger history
* transactional integrity
* user data isolation
* scalability for SaaS evolution

---

# Main Domains

The database is divided into several business domains.

## Authentication Domain

Responsible for:

* users
* authentication
* roles
* permissions
* audit access

Main entities:

* User
* AuditLog

---

## Financial Domain

Responsible for:

* accounts
* transactions
* balances
* transfers
* ledger entries

Main entities:

* Account
* Transaction
* Transfer
* LedgerEntry

---

## Credit Card Domain

Responsible for:

* credit cards
* invoices
* invoice payments
* installment purchases

Main entities:

* CreditCard
* CreditCardInvoice

---

## Recurrence Domain

Responsible for:

* recurring transactions
* financial scheduling
* automatic execution

Main entities:

* RecurringTransaction

---

## Vehicle Domain

Responsible for:

* vehicles
* maintenance
* fuel supplies
* vehicle expenses

Main entities:

* Vehicle
* Maintenance
* FuelSupply

---

# Core Financial Tables

## Accounts

Stores user financial accounts.

Examples:

* checking accounts
* savings accounts
* cash wallets

Important fields:

* balance
* currency
* type
* userId

---

## Transactions

Central financial operation table.

Stores:

* incomes
* expenses
* transfers
* credit card purchases

Important fields:

* amount
* type
* description
* categoryId
* accountId
* userId

---

## Ledger Entries

Immutable financial history table.

Responsible for:

* auditability
* reconciliation
* financial consistency

Each financial operation generates ledger entries.

---

## Transfers

Stores internal money movement between accounts.

Each transfer creates:

* debit operation
* credit operation
* ledger entries

---

# Relationships

Main relationship flow:

User
→ Accounts
→ Transactions
→ LedgerEntries

CreditCard
→ CreditCardInvoices
→ Transactions

RecurringTransaction
→ Scheduled Transactions

Vehicle
→ FuelSupplies
→ Maintenances

---

# Financial Integrity

The system guarantees consistency using:

* database transactions
* Prisma transactions
* ledger immutability
* atomic operations
* relational constraints

Critical operations always execute inside database transactions.

---

# Prisma Usage

Prisma is responsible for:

* schema management
* migrations
* typed queries
* transaction handling
* relational mapping

Schema location:

```bash
backend/prisma/schema.prisma
```

Migration location:

```bash
backend/prisma/migrations
```

---

# Migration Strategy

The platform uses incremental migrations.

Migration flow:

1. Update schema.prisma
2. Generate migration
3. Apply migration
4. Validate production compatibility

Command example:

```bash
npx prisma migrate dev --name create_accounts
```

---

# Decimal Precision

Financial values use Decimal fields.

Reason:

* avoid floating point precision problems
* maintain financial accuracy

Example:

```prisma
amount Decimal @db.Decimal(15,2)
```

---

# Auditability

The database was designed for full audit capability.

Audit features:

* immutable ledger
* audit logs
* timestamps
* user ownership
* transactional traceability

---

# Security

Security measures include:

* JWT authentication
* ownership validation
* relational isolation
* protected queries
* role-based access

---

# Future SaaS Evolution

The database was prepared for future multi-tenant architecture.

Planned additions:

* workspaceId
* organizationId
* tenant isolation
* subscription management

---

# Performance Strategy

Current optimization strategies:

* indexed foreign keys
* relational optimization
* pagination
* filtered queries
* transactional batching

Future optimizations:

* Redis cache
* read replicas
* partitioning
* background queues

---

# Backup Strategy

Recommended production strategy:

* automated PostgreSQL backups
* daily snapshots
* WAL archiving
* disaster recovery validation

---

# Current Status

Database foundation:
✅ Stable

Financial consistency:
✅ Strong

Ledger architecture:
✅ Operational

Multi-tenant readiness:
🚧 Planned

Horizontal scalability:
🚧 Future
