# Credit Cards Module

## Overview

The Credit Cards module is responsible for managing user credit cards and their financial lifecycle.

Unlike normal account expenses, credit card purchases do not immediately affect account balances.

Instead, purchases are accumulated into invoices that are paid later.

This module enables:

* invoice-based financial flow
* installment purchases
* invoice tracking
* billing cycle management
* deferred payment architecture

---

# Responsibilities

Main responsibilities:

* Manage credit cards
* Handle billing cycles
* Track invoice generation
* Associate purchases with invoices
* Manage invoice due dates
* Support installment purchases

---

# Core Concepts

## Credit Card

Represents a payment method with:

* credit limit
* closing date
* due date
* associated invoices

---

## Invoice

Invoices accumulate purchases made during a billing cycle.

Invoices remain open until payment.

---

## Deferred Expense

Credit card purchases are deferred expenses.

The account balance only changes when the invoice is paid.

---

# Features

Implemented features:

* Create credit cards
* Update credit cards
* Delete credit cards
* Billing cycle management
* Invoice generation
* Purchase association
* Installment integration
* Financial engine integration

---

# Main Entities

Entities related to this module:

* CreditCard
* CreditCardInvoice
* Transaction
* Installment

---

# Main Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | /credit-cards     | List credit cards       |
| GET    | /credit-cards/:id | Get credit card details |
| POST   | /credit-cards     | Create credit card      |
| PATCH  | /credit-cards/:id | Update credit card      |
| DELETE | /credit-cards/:id | Delete credit card      |

---

# Billing Cycle Flow

Credit card flow:

1. User creates purchase
2. Purchase is linked to invoice
3. Invoice accumulates purchases
4. Invoice reaches closing date
5. Invoice becomes payable
6. User pays invoice
7. Ledger entries are generated
8. Account balance is updated

---

# Invoice Integration

Every purchase belongs to an invoice.

Invoices support:

* total calculation
* due dates
* payment status
* reconciliation

---

# Installment Integration

Installment purchases may generate:

* multiple invoice entries
* future invoice obligations
* recurring monthly charges

Each installment can belong to a different invoice cycle.

---

# Business Rules

Important rules:

* purchases do not immediately affect balances
* invoices must belong to users
* invoice totals must remain synchronized
* closed invoices cannot receive new purchases
* installment schedules must remain immutable

---

# Security

Protected by:

* JWT authentication
* ownership validation
* DTO validation
* invoice consistency validation

---

# Integrations

Connected modules:

* transactions
* installments
* credit-card-invoices
* ledger
* reports
* accounts

---

# Future Improvements

Planned improvements:

* virtual cards
* shared cards
* bank synchronization
* automatic invoice import
* cashback support
* rewards system

---

# Status

Current module status:

✅ Stable

Invoice integration:
✅ Implemented

Installment support:
✅ Implemented

Bank sync:
🚧 Planned

Rewards system:
🚧 Planned
