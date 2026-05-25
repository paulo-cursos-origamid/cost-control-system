# 💰 Cost Control System

A personal finance management system built with **NestJS + Prisma**, focused on real-life expense tracking across categories such as home, vehicle, health, and credit card management.

---

# 🚀 Project Overview

This system is designed to give users full visibility over their financial life:

- Track expenses and income
- Manage accounts and balances
- Control credit card invoices
- Organize spending by context (home, vehicle, health)
- Generate financial insights and reports

---

# 🧠 Core Architecture

## 🔹 Financial Core

- Transactions (income & expenses)
- Accounts with real-time balance calculation
- Ledger system for financial integrity

## 🔹 Credit Card Engine

- Automatic invoice generation
- Reference month logic (closing day rule)
- Invoice statuses:
  - OPEN
  - CLOSED
  - PAID
- Payment processing with ledger integration
- Credit card limit validation

## 🔹 Domain Modules

### 🚗 Vehicles

- Fuel supplies tracking
- Maintenance records

### 🏠 Categories

- Expense categorization system
- Support for custom and default categories

### 📊 Reports & Dashboard

- Financial summaries
- Category-based analytics
- Vehicle cost analysis
- Cashflow overview

### 🔁 Recurring Transactions

- Scheduled financial entries
- Background processing system

---

# 🏗️ Tech Stack

- **Backend:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT (Passport)
- **Scheduler:** @nestjs/schedule
- **Architecture:** Modular monolith

---

# 📂 Project Structure
src/
├── modules/
│ ├── transactions
│ ├── accounts
│ ├── categories
│ ├── credit-cards
│ ├── credit-card-invoices
│ ├── vehicles
│ ├── ledger
│ ├── dashboard
│ ├── reports
│ ├── recurring-transactions
│ └── financial-scheduler
│
├── common/
├── config/
├── database/
└── shared/


---

# 💳 Credit Card Invoice Engine

The invoice system works based on:

- `closingDay`: defines billing cutoff
- `dueDay`: defines payment deadline
- `referenceMonth`: determines invoice grouping

### Flow:
1. Transaction is created
2. System determines invoice month
3. Invoice is created or reused
4. Transaction is attached
5. Invoice total is updated

---

# 📊 Ledger System

All financial movements are recorded in a ledger:

- Ensures auditability
- Maintains account balance integrity
- Supports income and expense tracking

---

# 🔐 Authentication

- JWT-based authentication
- User-scoped data access
- Secure module isolation

---

# ⚙️ Features Implemented

- [x] Transaction management
- [x] Account balance system
- [x] Ledger system
- [x] Credit card invoice engine
- [x] Invoice closing automation
- [x] Vehicle expense tracking
- [x] Financial reports
- [x] Recurring transactions
- [x] Dashboard analytics

---

# 📈 Business Goal

This project aims to become a **personal finance intelligence system**, allowing users to:

- Understand where money is spent
- Track real-life expenses (home, car, health)
- Control credit card usage
- Gain financial insights over time

---

# 🚧 Next Steps

- Frontend (Next.js dashboard)
- UI for transactions and cards
- Category intelligence improvements
- Financial insights engine
- Mobile-ready API consumption

---

# 🧑‍💻 Author

Built as a personal financial control system with a focus on real-world usage and extensibility.