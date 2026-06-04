# Service Patterns

## Overview

The CCP backend follows a service-oriented architecture using NestJS providers.

Services are responsible for:

* business logic
* orchestration
* financial consistency
* module integration
* transaction coordination

Controllers should remain thin.

---

# Architecture Principle

The architecture follows:

```text id="n5m6e7"
Controller -> Service -> Prisma -> Database
```

Controllers:

* receive requests
* validate input
* delegate operations

Services:

* execute business logic
* coordinate modules
* enforce financial rules

---

# Service Responsibilities

Services should:

* contain business logic
* orchestrate workflows
* validate domain rules
* coordinate database operations
* integrate with other modules

Services should NOT:

* contain HTTP logic
* manipulate raw request objects
* expose database internals
* contain presentation formatting

---

# Thin Controller Pattern

Controllers should remain minimal.

Example:

```typescript id="v6n8j1"
@Post()
create(
  @Body() dto: CreateTransactionDto,
  @CurrentUser() user: JwtUser,
) {
  return this.transactionsService.create(user.id, dto);
}
```

Business logic belongs inside services.

---

# Service Injection Pattern

Services should use dependency injection.

Example:

```typescript id="m8f2k4"
constructor(
  private readonly prisma: PrismaService,
  private readonly ledgerService: LedgerService,
) {}
```

---

# Financial Service Orchestration

Financial operations often require multiple services.

Example transaction flow:

```text id="p4x8w3"
TransactionsService
    ↓
FinancialEngineService
    ↓
LedgerService
    ↓
AccountsService
```

---

# Atomic Operations

Critical financial operations should use database transactions.

Example:

```typescript id="j7c5s9"
await this.prisma.$transaction(async (tx) => {
  // financial operations
});
```

Required for:

* transfers
* invoice payments
* recurring execution
* installment generation

---

# Financial Engine Pattern

Complex financial logic should be centralized.

Current centralized engine:

```text id="y3d1q6"
FinancialEngineService
```

Responsibilities:

* balance consistency
* ledger generation
* transaction coordination
* invoice integration

---

# Cross Module Communication

Modules communicate through services.

Example:

```typescript id="b2w6n4"
this.ledgerService.createEntry(...)
```

Avoid:

* direct database access across modules
* duplicated financial logic

---

# Domain Isolation

Each module owns its own business rules.

Examples:

| Module                 | Responsibility         |
| ---------------------- | ---------------------- |
| transactions           | financial operations   |
| ledger                 | accounting consistency |
| invoices               | invoice lifecycle      |
| transfers              | account movement       |
| recurring-transactions | recurrence automation  |

---

# Shared Logic

Reusable logic should live in:

```text id="r9e4u2"
src/shared
```

Or:

```text id="f5z8m1"
src/common
```

Avoid duplicated utility logic.

---

# Error Handling

Services should throw domain exceptions.

Example:

```typescript id="u7l3n0"
throw new BadRequestException(
  'Insufficient account balance',
);
```

---

# Logging Strategy

Future services should include:

* structured logs
* tracing IDs
* financial operation tracking
* scheduler logs

---

# Scheduler Service Pattern

Schedulers should orchestrate services.

Schedulers should NOT contain:

* financial rules
* duplicated logic

Example:

```typescript id="t1q5c8"
await this.recurringTransactionsService.executePending();
```

---

# Audit Integration

Sensitive services may generate audit events.

Examples:

* account deletion
* role updates
* financial reversals
* invoice payments

---

# Future Service Improvements

Planned improvements:

* CQRS
* event-driven architecture
* queues
* Kafka/RabbitMQ integration
* domain events
* websocket events

---

# Scalability Goals

The service architecture was designed for:

* SaaS scalability
* horizontal scaling
* microservice evolution
* enterprise growth

---

# Current Status

Thin controllers:
✅ Active

Service orchestration:
✅ Active

Financial engine:
✅ Implemented

Atomic transactions:
✅ Active

CQRS:
🚧 Planned

Event-driven architecture:
🚧 Planned
