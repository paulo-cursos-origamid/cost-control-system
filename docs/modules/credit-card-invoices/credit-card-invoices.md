# Credit Card Invoices Module

## Overview

The Credit Card Invoices module is responsible for managing invoice lifecycles within the CCP platform.

Invoices accumulate deferred credit card expenses and become payable after the billing cycle closes.

This module guarantees:

* invoice consistency
* billing cycle management
* invoice payment processing
* financial reconciliation
* ledger integration

Invoices are central components of the credit card financial architecture.

---

# Responsibilities

Main responsibilities:

* Manage invoice lifecycle
* Calculate invoice totals
* Track invoice status
* Handle invoice payments
* Maintain billing cycles
* Integrate with ledger operations

---

# Core Concepts

## Open Invoice

An invoice currently receiving purchases.

---

## Closed Invoice

An invoice whose billing cycle ended.

No new purchases can be added.

---

## Paid Invoice

An invoice already settled by the user.

Account balances and ledger entries are updated during payment.

---

# Features

Implemented features:

* Invoice generation
* Invoice closing
* Invoice payment
* Total calculation
* Purchase aggregation
* Installment support
* Ledger integration
* Financial reconciliation

---

# Main Entities

Entities related to this module:

* CreditCardInvoice
* CreditCard
* Transaction
* LedgerEntry
* Installment

---

# Main Endpoints

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | /credit-card-invoices         | List invoices       |
| GET    | /credit-card-invoices/:id     | Get invoice details |
| POST   | /credit-card-invoices/:id/pay | Pay invoice         |

---

# Invoice Lifecycle

Invoice lifecycle flow:

1. Invoice is created
2. Purchases are attached
3. Billing cycle closes
4. Invoice becomes payable
5. User pays invoice
6. Ledger entries are generated
7. Account balance is updated
8. Invoice status becomes PAID

---

# Payment Flow

Invoice payment flow:

1. User selects payment account
2. Financial engine validates balance
3. Ledger debit entry is generated
4. Invoice payment record is created
5. Account balance is updated
6. Invoice status changes to PAID

---

# Ledger Integration

Invoice payments generate ledger entries.

This guarantees:

* financial traceability
* payment history
* reconciliation support
* accounting consistency

---

# Installment Integration

Installment purchases may spread across multiple invoices.

Each invoice may contain:

* current purchases
* installment fragments
* recurring obligations

---

# Invoice Status

Supported statuses:

* OPEN
* CLOSED
* PAID
* OVERDUE

---

# Business Rules

Important rules:

* closed invoices cannot receive purchases
* paid invoices are immutable
* invoice totals must remain synchronized
* users can only access their own invoices
* invoice payment must be atomic

---

# Security

Protected by:

* JWT authentication
* ownership validation
* transactional consistency
* DTO validation

---

# Integrations

Connected modules:

* credit-cards
* transactions
* installments
* ledger
* accounts
* reports

---

# Future Improvements

Planned improvements:

* partial invoice payment
* automatic payment scheduling
* bank synchronization
* PDF invoice generation
* email reminders
* smart overdue handling

---

# Status

Current module status:

✅ Stable

Invoice lifecycle:
✅ Implemented

Ledger integration:
✅ Implemented

Partial payments:
🚧 Planned

Bank sync:
🚧 Planned
