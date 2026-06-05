# Users Module

## Overview

The Users module is responsible for managing platform users inside the CCP system.

It centralizes:

* user registration
* user profiles
* permissions
* ownership
* account relationships
* financial isolation

Every financial operation inside the platform belongs to a user.

---

# Responsibilities

Main responsibilities:

* manage users
* maintain user profiles
* control ownership
* support authentication
* manage permissions
* isolate financial data

---

# Features

Implemented features:

* create users
* update users
* list users
* role support
* ownership validation
* JWT integration
* password hashing

Future features:

* email verification
* MFA authentication
* profile customization
* user preferences
* Open Finance linking

---

# Main Endpoints

| Method | Endpoint   | Description      |
| ------ | ---------- | ---------------- |
| GET    | /users     | List users       |
| GET    | /users/:id | Get user details |
| POST   | /users     | Create user      |
| PATCH  | /users/:id | Update user      |
| DELETE | /users/:id | Delete user      |

---

# Main Entity

Primary entity:

```text id="u5x9wr"
User
```

---

# User Roles

Supported roles:

| Role  | Description           |
| ----- | --------------------- |
| ADMIN | administrative access |
| USER  | regular platform user |

Future roles may include:

* financial advisor
* accountant
* support operator

---

# Authentication Integration

The Users module integrates directly with:

* JWT authentication
* refresh tokens
* password hashing
* authorization guards

---

# Ownership Model

The CCP platform uses strict ownership isolation.

Rules:

* users only access their own financial data
* transactions belong to users
* accounts belong to users
* invoices belong to users
* reports belong to users

---

# Financial Relationships

Users are connected to:

* accounts
* transactions
* transfers
* invoices
* recurring-transactions
* vehicles

---

# Security

Security protections include:

* bcrypt password hashing
* JWT authentication
* role guards
* ownership validation
* DTO validation

---

# User Lifecycle

Typical lifecycle:

```text id="n8p2mq"
Register User
      ↓
Authenticate
      ↓
Create Accounts
      ↓
Create Transactions
      ↓
Generate Reports
```

---

# Permissions

Permissions control access to:

* admin operations
* sensitive financial operations
* audit data
* user management

---

# Business Rules

Important rules:

* emails must be unique
* passwords must be hashed
* users cannot access external data
* financial isolation must remain consistent
* deleted users should preserve historical integrity

---

# Audit Integration

Sensitive user operations generate audit logs.

Examples:

* login attempts
* password changes
* role changes
* profile updates

---

# Relationships

Connected modules:

* auth
* accounts
* transactions
* reports
* audit
* invoices
* vehicles

---

# Future Improvements

Planned improvements:

* MFA authentication
* biometric login
* OAuth providers
* Open Finance integration
* user settings
* profile customization

---

# Example Flow

```text id="k4m7tx"
User Registration
      ↓
Authentication
      ↓
Financial Operations
      ↓
Analytics & Reports
```

---

# Status

Users module:
✅ Operational

JWT integration:
✅ Implemented

Role system:
✅ Implemented

MFA:
🚧 Planned

OAuth:
🚧 Planned
