# Invoice Business Rules

## Overview

Invoices represent grouped financial obligations associated with credit cards.

The invoice system is responsible for:

* grouping purchases
* managing billing cycles
* controlling due dates
* tracking payments
* integrating with ledger operations

Invoices are central to credit card financial management.

---

# Core Principle

An invoice accumulates multiple financial operations into a single payable obligation.

Example:

```text id="a1d93k"
Credit card purchases → Monthly invoice
```

The invoice becomes payable on its due date.

---

# Invoice Structure

Each invoice contains:

| Field           | Description            |
| --------------- | ---------------------- |
| id              | invoice identifier     |
| userId          | invoice owner          |
| creditCardId    | associated credit card |
| closingDate     | invoice closing date   |
| dueDate         | invoice payment date   |
| totalAmount     | invoice total          |
| paidAmount      | amount already paid    |
| remainingAmount | pending amount         |
| status          | invoice state          |

---

# Invoice Status

Supported statuses:

* OPEN
* CLOSED
* PAID
* OVERDUE
* PARTIALLY_PAID

---

# Billing Cycle Rules

Invoices follow billing cycles.

Example:

| Closing Date | Due Date |
| ------------ | -------- |
| Day 10       | Day 20   |

Purchases made after closing move to the next invoice.

---

# Purchase Association Rules

Credit card purchases are attached to invoices based on:

* purchase date
* invoice closing date
* billing cycle

The system must automatically determine the correct invoice.

---

# Installment Integration

Installment purchases may generate:

* multiple invoice entries
* future invoice obligations
* recurring billing cycles

Example:

```text id="v2m8qf"
12x purchase → 12 invoices
```

---

# Payment Rules

Invoice payment:

1. updates invoice status
2. generates ledger entries
3. decreases account balance
4. reconciles financial obligations

---

# Partial Payment Rules

Invoices may support partial payments.

Example:

| Total | Paid | Remaining |
| ----- | ---- | --------- |
| 1000  | 400  | 600       |

The invoice remains partially open.

---

# Overdue Rules

An invoice becomes overdue when:

```text id="c3s1rt"
current_date > dueDate
AND status != PAID
```

Future automations may include:

* reminders
* notifications
* interest calculation
* penalty generation

---

# Financial Consistency Rules

Invoice totals must always equal:

```text id="m7k5xp"
sum(all invoice transactions)
```

The system must prevent inconsistent invoice balances.

---

# Ledger Integration

Invoices integrate deeply with the ledger engine.

Invoice payments generate:

* debit entries
* reconciliation records
* payment history
* account balance updates

---

# Credit Card Integration

Invoices belong to credit cards.

Relationship:

```text id="o4l8wy"
Credit Card → Many Invoices
```

Each invoice belongs to only one card.

---

# Closing Rules

When an invoice closes:

* new purchases move to next cycle
* totals become finalized
* payment becomes expected

Closed invoices should preserve historical integrity.

---

# Reopening Rules

Reopening invoices is dangerous.

Recommended restrictions:

* admin only
* audit required
* ledger reconciliation required

---

# Ownership Rules

Users may only access invoices belonging to:

* their own credit cards
* their own transactions
* their own accounts

---

# Reporting Rules

Invoices affect:

* debt reports
* cash flow forecasting
* monthly expenses
* financial planning

Invoices do NOT directly affect balance until payment occurs.

---

# Security Rules

Invoices are protected by:

* JWT authentication
* ownership validation
* role guards
* audit logging

---

# Future Improvements

Planned improvements:

* automatic invoice closing
* PDF invoice generation
* email reminders
* smart debt analysis
* installment simulations
* bank integrations

---

# Current Status

Invoice engine:
✅ Operational

Installment integration:
✅ Stable

Ledger integration:
✅ Implemented

Automatic overdue processing:
🚧 Planned

Advanced analytics:
🚧 Planned
