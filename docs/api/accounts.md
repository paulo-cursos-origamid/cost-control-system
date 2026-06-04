# Accounts API

## Overview

The Accounts API is responsible for managing financial accounts inside the CCP platform.

Accounts represent:

* bank accounts
* wallets
* cash accounts
* savings accounts
* digital accounts

All financial operations are connected to accounts.

---

# Base Route

```http id="r65k9q"
/api/accounts
```

---

# Authentication

All endpoints require JWT authentication.

Example:

```http id="m8k1xq"
Authorization: Bearer <token>
```

---

# Endpoints

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | /accounts     | List accounts  |
| GET    | /accounts/:id | Get account    |
| POST   | /accounts     | Create account |
| PATCH  | /accounts/:id | Update account |
| DELETE | /accounts/:id | Delete account |

---

# Create Account

## Endpoint

```http id="a7l2mq"
POST /api/accounts
```

---

# Request Body

```json id="v3t8ke"
{
  "name": "Main Bank Account",
  "type": "CHECKING",
  "initialBalance": 5000,
  "color": "#0000FF",
  "icon": "wallet"
}
```

---

# Account Types

Supported types:

* CHECKING
* SAVINGS
* CASH
* DIGITAL
* INVESTMENT

---

# Success Response

```json id="w92jqp"
{
  "id": "uuid",
  "name": "Main Bank Account",
  "balance": 5000,
  "type": "CHECKING",
  "createdAt": "2026-06-03T00:00:00.000Z"
}
```

---

# Initial Balance

When an account is created with an initial balance:

* a ledger entry is generated
* account balance is initialized
* financial history becomes traceable

---

# Balance Management

Balances are automatically updated through:

* transactions
* transfers
* invoice payments
* recurring operations

Balances should never be manually manipulated outside the financial engine.

---

# Pagination

Supported query params:

```http id="f9pj2x"
GET /api/accounts?page=1&limit=20
```

---

# Ownership Validation

Users can only access their own accounts.

Cross-user access is forbidden.

---

# Financial Consistency

The account module integrates directly with:

* ledger
* transactions
* transfers
* invoices

This guarantees financial consistency across the platform.

---

# Soft Delete Rules

Accounts with financial history should preserve:

* ledger history
* transaction history
* audit trail

Deletion rules depend on business validation.

---

# Error Responses

## Unauthorized

```json id="xz8k4m"
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Validation Error

```json id="b3t1ze"
{
  "statusCode": 400,
  "message": [
    "name should not be empty"
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

* transactions
* ledger
* transfers
* reports
* invoices
* recurring-transactions

---

# Future Improvements

Planned improvements:

* bank synchronization
* open finance integration
* automatic reconciliation
* account grouping
* balance forecasting

---

# Status

Core CRUD:
✅ Implemented

Ledger integration:
✅ Implemented

Balance recalculation:
✅ Implemented

Bank sync:
🚧 Planned

