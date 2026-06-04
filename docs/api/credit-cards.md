# Credit Cards API

## Overview

The Credit Cards API manages user credit cards inside the CCP platform.

This module is responsible for:

* credit card registration
* invoice generation
* purchase tracking
* billing cycles
* limit management
* invoice payments

Credit cards are fully integrated with the financial engine and ledger system.

---

# Base Route

```http
/api/credit-cards
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

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /credit-cards     | List cards       |
| GET    | /credit-cards/:id | Get card details |
| POST   | /credit-cards     | Create card      |
| PATCH  | /credit-cards/:id | Update card      |
| DELETE | /credit-cards/:id | Delete card      |

---

# Create Credit Card

## Endpoint

```http
POST /api/credit-cards
```

---

# Request Body

```json
{
  "name": "Nubank",
  "brand": "MASTERCARD",
  "limit": 5000,
  "closingDay": 10,
  "dueDay": 15,
  "accountId": "uuid"
}
```

---

# Success Response

```json
{
  "id": "uuid",
  "name": "Nubank",
  "brand": "MASTERCARD",
  "limit": 5000,
  "availableLimit": 5000,
  "closingDay": 10,
  "dueDay": 15
}
```

---

# Invoice Cycle

Credit cards operate using invoice cycles.

Cycle behavior:

1. Purchases accumulate into current invoice
2. Invoice closes automatically
3. Invoice becomes payable
4. Payment affects account balance
5. Ledger entries are generated

---

# Purchase Flow

Credit card purchases:

* do NOT immediately affect account balances
* increase invoice total
* reduce available limit
* generate future financial obligations

---

# Invoice Integration

Every purchase belongs to an invoice.

Invoices maintain:

* total amount
* due date
* payment status
* closing cycle
* related purchases

---

# Available Limit Calculation

Available limit formula:

```text
availableLimit = totalLimit - openInvoiceAmount
```

---

# Validation Rules

Business rules:

* closing day must be between 1 and 31
* due day must be between 1 and 31
* limit must be positive
* users can only manage their own cards

---

# Ledger Integration

Ledger entries occur during:

* invoice payment
* purchase reversal
* refund operations

---

# Invoice Payment Flow

Invoice payment process:

1. User pays invoice
2. Account balance decreases
3. Invoice status changes
4. Ledger entries are created
5. Available limit is restored

---

# Security

Protected by:

* JWT authentication
* ownership validation
* financial engine validation
* transactional consistency

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

## Invalid Billing Cycle

```json
{
  "statusCode": 400,
  "message": "Invalid closing day"
}
```

---

## Invalid Limit

```json
{
  "statusCode": 400,
  "message": "Limit must be greater than zero"
}
```

---

# Integrations

Connected modules:

* credit-card-invoices
* transactions
* accounts
* ledger
* reports
* financial-engine

---

# Future Improvements

Planned improvements:

* virtual cards
* installment simulation
* cashback support
* card rewards
* bank synchronization
* Open Finance integration

---

# Status

Credit card engine:
✅ Implemented

Invoice integration:
✅ Implemented

Financial consistency:
✅ Implemented

Bank sync:
🚧 Planned
