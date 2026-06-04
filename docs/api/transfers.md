# Transfers API

## Overview

The Transfers API is responsible for handling internal money transfers between accounts inside the CCP platform.

Transfers guarantee:

* balance consistency
* double-entry financial integrity
* ledger synchronization
* traceable account movement

A transfer always moves money from one account to another.

---

# Base Route

```http id="3rz6we"
/api/transfers
```

---

# Authentication

All endpoints require JWT authentication.

Example:

```http id="k4p9mx"
Authorization: Bearer <token>
```

---

# Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /transfers     | List transfers  |
| GET    | /transfers/:id | Get transfer    |
| POST   | /transfers     | Create transfer |

---

# Create Transfer

## Endpoint

```http id="e8u7pw"
POST /api/transfers
```

---

# Request Body

```json id="m7xa0d"
{
  "fromAccountId": "uuid",
  "toAccountId": "uuid",
  "amount": 1500,
  "description": "Transfer to savings"
}
```

---

# Success Response

```json id="p4h2kt"
{
  "id": "uuid",
  "amount": 1500,
  "description": "Transfer to savings",
  "createdAt": "2026-06-03T00:00:00.000Z"
}
```

---

# Transfer Flow

Transfer processing flow:

1. Validate ownership
2. Validate source balance
3. Debit source account
4. Credit destination account
5. Generate ledger entries
6. Persist transaction atomically

---

# Financial Integrity

Transfers follow double-entry accounting principles.

Every transfer generates:

* one debit entry
* one credit entry

This guarantees balance consistency.

---

# Validation Rules

Rules enforced:

* amount must be greater than zero
* accounts must belong to authenticated user
* source and destination accounts must differ
* source account must have sufficient balance

---

# Ledger Integration

Transfers automatically generate immutable ledger entries.

This ensures:

* auditability
* traceability
* historical consistency
* financial reconciliation

---

# Atomic Transactions

Transfers are processed atomically.

If any step fails:

* balances rollback
* ledger rollback occurs
* transfer is canceled

---

# Ownership Validation

Users can only transfer between their own accounts.

Cross-user transfers are forbidden.

---

# Error Responses

## Unauthorized

```json id="v8e2rs"
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Insufficient Balance

```json id="o5f7da"
{
  "statusCode": 400,
  "message": "Insufficient balance"
}
```

---

## Invalid Accounts

```json id="t1j6mk"
{
  "statusCode": 400,
  "message": "Source and destination accounts must differ"
}
```

---

# Security

Protected by:

* JWT authentication
* ownership validation
* financial engine safeguards
* atomic database transactions

---

# Integrations

Connected modules:

* accounts
* ledger
* transactions
* reports
* financial-engine

---

# Future Improvements

Planned improvements:

* scheduled transfers
* recurring transfers
* transfer templates
* PIX/Open Finance integration
* transfer approvals

---

# Status

Internal transfers:
✅ Implemented

Ledger integration:
✅ Implemented

Atomic consistency:
✅ Implemented

Open finance:
🚧 Planned
