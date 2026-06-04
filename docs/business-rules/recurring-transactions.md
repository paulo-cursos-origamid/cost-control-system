# Recurring Transactions Business Rules

## Overview

Recurring transactions are automated financial operations that repeat over time.

They are designed to automate predictable financial activities such as:

* salaries
* subscriptions
* rent
* utility bills
* loan payments
* insurance
* recurring transfers

The recurring transaction system reduces manual work and guarantees financial continuity.

---

# Supported Frequencies

The platform supports multiple recurrence frequencies.

Available recurrence intervals:

* DAILY
* WEEKLY
* MONTHLY
* QUARTERLY
* YEARLY

---

# Core Business Rule

A recurring transaction is considered a template.

The template itself does not directly affect balances.

Instead:

1. scheduler detects due recurrence
2. system generates a real transaction
3. transaction enters financial engine
4. ledger entries are created
5. balances are updated

---

# Recurrence Lifecycle

Recurring transactions follow this lifecycle:

1. Created
2. Scheduled
3. Executed
4. Next execution calculated
5. Repeated until end condition

---

# End Conditions

Recurring transactions may end in different ways.

Supported end conditions:

* no end date
* fixed number of occurrences
* explicit end date
* manual cancellation

---

# Automatic Execution

Recurring transactions are executed automatically by the financial scheduler.

The scheduler:

* scans pending recurrences
* validates execution dates
* creates financial transactions
* handles failures
* logs execution history

---

# Execution Rules

Important execution rules:

* execution must be idempotent
* duplicate generation is forbidden
* scheduler must tolerate retries
* failed executions must be logged
* recurrence state must remain consistent

---

# Financial Consistency

Every generated recurring transaction must:

* pass through financial engine
* create ledger entries
* preserve transactional integrity
* respect account ownership
* validate balance rules

---

# Supported Transaction Types

Recurring transactions may generate:

* income transactions
* expense transactions
* transfers

Credit card invoice generation may also be supported.

---

# Date Calculation Rules

Date calculations must handle:

* different month lengths
* leap years
* timezone consistency
* daylight saving adjustments
* end-of-month edge cases

---

# Example

Monthly rent example:

* recurrence created:
  * every month
  * day 5
  * amount: 1500

Execution flow:

1. scheduler reaches day 5
2. expense transaction is generated
3. ledger entry created
4. account balance updated
5. next execution scheduled

---

# Failure Handling

If execution fails:

* error is logged
* recurrence remains active
* retry may occur later
* duplicated execution must be prevented

---

# Cancellation Rules

When recurrence is cancelled:

* future executions stop
* historical transactions remain preserved
* generated ledger entries remain immutable

Cancellation never deletes past financial history.

---

# Relationship With Other Modules

Recurring transactions integrate with:

* transactions
* financial-engine
* ledger
* accounts
* scheduler
* reports

---

# Security Rules

Users may only:

* create their own recurrences
* manage their own schedules
* cancel owned recurrences
* access their own execution history

---

# Auditability

The system must maintain:

* execution timestamps
* generated transaction references
* failure logs
* scheduler history
* recurrence status changes

---

# Future Improvements

Planned future improvements:

* smart recurrence prediction
* AI schedule suggestions
* recurring transaction grouping
* holiday-aware scheduling
* retry policies
* notification system
* execution simulation

---

# Technical Constraints

Recurring execution must guarantee:

* atomic execution
* retry safety
* distributed consistency
* no duplicated financial events

---

# Status

Recurring engine:
✅ Implemented

Scheduler integration:
✅ Operational

Failure handling:
✅ Partial

Retry strategy:
🚧 Planned

Advanced recurrence rules:
🚧 Future
