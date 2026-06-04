# Credit Card Invoices API

## Overview

The Credit Card Invoices API manages invoice cycles and payments.

Invoices represent accumulated credit card purchases for a billing cycle.

This module is responsible for:

* invoice generation
* invoice closing
* invoice payments
* purchase aggregation
* payment tracking
* invoice status management

---

# Base Route

```http
/api/credit-card-invoices
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

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | /credit-card-invoices           | List invoices       |
| GET    | /credit-card-invoices/:id       | Get invoice details |
| POST   | /credit-card-invoices/:id/pay   | Pay invoice         |
| PATCH  | /credit-card-invoices/:id/close | Close invoice       |

---

# Invoice Structure

Invoices contain:

* billing cycle
* total amount
* due date
* closing date
* payment status
* related purchases
* payment transactions

---

# Invoice Status

Supported statuses:

* OPEN
* CLOSED
* PAID
* OVERDUE

---

# Invoice Lifecycle

Invoice lifecycle:

1. Invoice is created
2. Purchases accumulate
3. Invoice closes
4. Payment becomes available
5. User pays invoice
6. Ledger updates balances

---

# List Invoices

## Endpoint

```http
GET /api/credit-card-invoices
```

---

# Success Response

```json
[
  {
    "id": "uuid",
    "status": "OPEN",
    "amount": 1250.50,
    "dueDate": "2026-06-15",
    "closingDate": "2026-06-10"
  }
]
```

---

# Pay Invoice

## Endpoint

```http
POST /api/credit-card-invoices/:id/pay
```

---

# Request Body

```json
{
  "accountId": "uuid"
}
```

---

# Payment Flow

Invoice payment process:

1. User selects account
2. System validates balance
3. Account balance decreases
4. Invoice becomes PAID
5. Ledger entries are created
6. Credit limit is restored

---

# Financial Impact

Invoice payments:

* decrease account balance
* restore available credit limit
* create ledger audit entries
* update financial reports

---

# Ledger Integration

The ledger guarantees:

* financial traceability
* immutable history
* reconciliation support
* audit consistency

---

# Closing Logic

Invoices close automatically according to:

* card closing day
* scheduler execution
* billing cycle rules

Closed invoices stop receiving purchases.

---

# Validation Rules

Business rules:

* only OPEN or CLOSED invoices can be paid
* paid invoices cannot be modified
* invoice ownership is validated
* accounts must belong to the user

---

# Error Responses

## Invoice Already Paid

```json
{
  "statusCode": 400,
  "message": "Invoice already paid"
}
```

---

## Insufficient Balance

```json
{
  "statusCode": 400,
  "message": "Insufficient balance"
}
```

---

## Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

# Security

Protected by:

* JWT authentication
* ownership validation
* transactional operations
* ledger consistency

---

# Integrations

Connected modules:

* credit-cards
* accounts
* ledger
* transactions
* reports
* financial-engine

---

# Future Improvements

Planned improvements:

* partial payments
* automatic payments
* invoice PDF generation
* bank slip support
* PIX integration
* Open Finance synchronization

---

# Status

Invoice engine:
✅ Implemented

Payment flow:
✅ Operational

Ledger integration:
✅ Stable

Partial payments:
🚧 Planned
