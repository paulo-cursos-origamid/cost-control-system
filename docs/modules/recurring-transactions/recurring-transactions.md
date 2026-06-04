# Recurring Transactions Module

## Overview

The Recurring Transactions module is responsible for automating repetitive financial operations.

This module allows users to create scheduled financial templates that automatically generate future transactions.

The recurring engine supports:

* recurring expenses
* recurring income
* subscriptions
* fixed bills
* automated financial workflows

---

# Responsibilities

Main responsibilities:

* Schedule recurring operations
* Generate future transactions
* Handle recurrence rules
* Integrate with financial scheduler
* Maintain recurring lifecycle
* Support automation workflows

---

# Core Concepts

## Recurring Transaction

A recurring transaction acts as a financial template.

Instead of representing a real financial operation directly, it generates future transactions automatically.

---

## Scheduler Engine

The scheduler periodically checks recurring rules and generates pending financial operations.

---

## Automation

The recurring engine reduces manual financial management by automating repetitive operations.

---

# Features

Implemented features:

* Create recurring transactions
* Update recurring rules
* Delete recurring transactions
* Generate scheduled transactions
* Monthly recurrence support
* Weekly recurrence support
* Yearly recurrence support
* Scheduler integration

---

# Main Entities

Entities related to this module:

* RecurringTransaction
* Transaction
* Account
* Category
* LedgerEntry

---

# Main Endpoints

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| GET    | /recurring-transactions     | List recurring transactions       |
| GET    | /recurring-transactions/:id | Get recurring transaction details |
| POST   | /recurring-transactions     | Create recurring transaction      |
| PATCH  | /recurring-transactions/:id | Update recurring transaction      |
| DELETE | /recurring-transactions/:id | Delete recurring transaction      |

---

# Recurrence Flow

Recurring execution flow:

1. User creates recurring rule
2. Scheduler scans pending recurrences
3. Financial engine validates execution
4. Transaction is generated
5. Ledger entries are created
6. Balances are updated
7. Next execution date is scheduled

---

# Supported Frequencies

Supported recurrence types:

* DAILY
* WEEKLY
* MONTHLY
* YEARLY

---

# Scheduler Integration

The recurring module integrates directly with the financial scheduler.

The scheduler is responsible for:

* processing due recurrences
* avoiding duplicated execution
* generating automated transactions
* maintaining execution history

---

# Financial Integration

Generated recurring transactions behave like normal financial operations.

They integrate with:

* accounts
* ledger
* reports
* categories
* invoices

---

# Business Rules

Important rules:

* recurring templates do not directly affect balances
* only generated transactions affect balances
* inactive recurrences are ignored
* duplicated generation must be prevented
* execution history must remain auditable

---

# Security

Protected by:

* JWT authentication
* ownership validation
* scheduler validation
* DTO validation

---

# Integrations

Connected modules:

* transactions
* financial-scheduler
* accounts
* categories
* ledger
* reports

---

# Future Improvements

Planned improvements:

* smart recurrence detection
* AI recurrence suggestions
* cron-based schedules
* recurrence pause/resume
* retry mechanisms
* event-driven processing

---

# Status

Current module status:

✅ Stable

Scheduler integration:
✅ Implemented

Automated generation:
✅ Implemented

Advanced cron support:
🚧 Planned

AI automation:
🚧 Planned
