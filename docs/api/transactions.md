# Transactions API

## Overview

The Transactions API is responsible for managing all financial transactions inside the CCP platform.

This API handles:

* incomes
* expenses
* transfers
* vehicle expenses
* recurring transactions
* credit card purchases

Transactions are the core business entity of the platform.

---

# Base Route

```http
/api/transactions
```

---

# Authentication

All endpoints require JWT authentication.

Example:

```http
Authorization: Bearer <token>
```

---

# Endpoints

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /transactions     | List transactions  |
| GET    | /transactions/:id | Get transaction    |
| POST   | /transactions     | Create transaction |
| PATCH  | /transactions/:id | Update transaction |
| DELETE | /transactions/:id | Delete transaction |

---

# Create Transaction

## Endpoint

```http
POST /api/transactions
```

---

# Request Body

```json
{
  "description": "Salary",
  "amount": 5000,
  "type": "INCOME",
  "accountId": "uuid",
  "categoryId": "uuid",
  "date": "2026-06-03T00:00:00.000Z"
}
```

---

# Transaction Types

Supported types:

* INCOME
* EXPENSE
* TRANSFER
* CREDIT_CARD
* VEHICLE_EXPENSE

---

# Success Response

```json
{
  "id": "uuid",
  "description": "Salary",
  "amount": 5000,
  "type": "INCOME",
  "createdAt": "2026-06-03T00:00:00.000Z"
}
```

---

# Validation Rules

Rules enforced:

* amount must be greater than zero
* account must belong to authenticated user
* category must belong to authenticated user
* transaction type must be valid

---

# Financial Processing

Transaction creation triggers:

1. DTO validation
2. Financial engine processing
3. Ledger entry generation
4. Balance recalculation
5. Report synchronization

---

# Pagination

Supported query params:

```http
GET /api/transactions?page=1&limit=20
```

---

# Filtering

Supported filters:

```http
GET /api/transactions?type=EXPENSE
GET /api/transactions?categoryId=uuid
GET /api/transactions?accountId=uuid
```

---

# Ownership Validation

Users can only access their own transactions.

Cross-user access is forbidden.

---

# Ledger Integration

Every transaction generates immutable ledger entries.

This guarantees:

* traceability
* auditability
* financial consistency

---

# Credit Card Transactions

Credit card transactions:

* do not immediately affect balances
* attach to invoices
* become payable later

---

# Recurring Transactions

Recurring transactions automatically generate standard transactions using the scheduler module.

---

# Error Responses

## Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Validation Error

```json
{
  "statusCode": 400,
  "message": [
    "amount must be greater than 0"
  ]
}
```

---

# Security

Protected by:

* JWT authentication
* ownership validation
* DTO validation
* financial engine safeguards

---

# Integrations

Connected modules:

* accounts
* categories
* ledger
* reports
* recurring-transactions
* credit-cards
* invoices

---

# Future Improvements

Planned improvements:

* CSV import
* bulk operations
* bank synchronization
* AI categorization
* smart transaction prediction

---

# Status

Core CRUD:
✅ Implemented

Ledger integration:
✅ Implemented

Recurring support:
✅ Implemented

Bank sync:
🚧 Planned
