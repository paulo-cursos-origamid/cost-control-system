# Categories Module

## Overview

The Categories module is responsible for organizing financial operations inside the CCP platform.

Categories are used to classify:

* expenses
* incomes
* vehicle costs
* recurring transactions
* reports
* dashboards

They are fundamental for financial analytics and reporting.

---

# Responsibilities

Main responsibilities:

* create financial categories
* organize transactions
* support reports
* support dashboards
* classify vehicle expenses
* improve financial visibility

---

# Features

Implemented features:

* create categories
* update categories
* delete categories
* category filtering
* category ownership validation
* transaction association
* vehicle category support

Future features:

* AI categorization
* automatic suggestions
* smart grouping
* category hierarchy

---

# Main Endpoints

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | /categories     | List categories      |
| GET    | /categories/:id | Get category details |
| POST   | /categories     | Create category      |
| PATCH  | /categories/:id | Update category      |
| DELETE | /categories/:id | Delete category      |

---

# Main Entity

Primary entity:

```text id="a2v8qx"
Category
```

---

# Category Types

Supported category types:

| Type    | Description                |
| ------- | -------------------------- |
| INCOME  | incoming money             |
| EXPENSE | regular expenses           |
| VEHICLE | vehicle-related operations |

---

# Examples

Examples of expense categories:

* Food
* Rent
* Internet
* Health
* Entertainment

Examples of income categories:

* Salary
* Freelance
* Investments

Examples of vehicle categories:

* Fuel
* Maintenance
* Insurance
* Tires

---

# Transaction Integration

Categories are directly associated with transactions.

Example:

```text id="m7w4pd"
Transaction
      ↓
Category
      ↓
Reports
      ↓
Dashboards
```

---

# Dashboard Integration

Categories are heavily used in dashboards.

Examples:

* expense distribution
* monthly spending
* category comparison
* top expenses
* financial analytics

---

# Reports Integration

Reports rely on categories to generate:

* financial summaries
* grouped expenses
* income analysis
* vehicle cost reports

---

# Vehicle Integration

Vehicle categories help organize automotive expenses.

Examples:

* fuel
* maintenance
* insurance
* taxes
* repairs

This allows the CCP to support vehicle financial management.

---

# Ownership Rules

Categories belong to users.

Rules:

* users can only access their own categories
* categories must not leak across users
* financial isolation must be preserved

---

# Business Rules

Important rules:

* categories should be reusable
* transactions require valid categories
* categories cannot break historical reports
* deleted categories should preserve historical integrity

---

# Security

Protected by:

* JWT authentication
* ownership validation
* DTO validation
* role guards

---

# Relationships

Connected modules:

* transactions
* reports
* dashboard
* vehicles
* recurring-transactions

---

# Financial Analytics

Categories enable advanced analytics:

* spending behavior
* recurring expenses
* savings analysis
* expense concentration
* financial forecasting

---

# Future Improvements

Planned improvements:

* AI category suggestions
* automatic categorization
* nested categories
* tags system
* spending goals
* category budgets

---

# Example Flow

```text id="r5m9tz"
Create Category
      ↓
Associate Transaction
      ↓
Generate Reports
      ↓
Update Dashboard Analytics
```

---

# Status

Module status:
✅ Stable

Reports integration:
✅ Implemented

Dashboard integration:
✅ Implemented

Vehicle support:
✅ Implemented

AI categorization:
🚧 Planned
