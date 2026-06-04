# Roles And Permissions

## Overview

The CCP platform uses a role-based authorization system (RBAC).

Roles determine which operations a user may perform inside the platform.

Authorization is enforced through:

* JWT authentication
* role guards
* ownership validation
* protected routes

---

# Current Roles

Currently supported roles:

| Role  | Description            |
| ----- | ---------------------- |
| ADMIN | Platform administrator |
| USER  | Regular platform user  |

---

# USER Role

Default role for platform users.

Permissions include:

* manage own accounts
* manage own transactions
* manage own credit cards
* manage own vehicles
* generate personal reports
* manage recurring transactions

Restrictions:

* cannot access other users' data
* cannot access admin routes
* cannot manage platform configuration

---

# ADMIN Role

Administrative platform role.

Permissions include:

* manage all users
* access administrative endpoints
* view audit information
* monitor platform operations
* access platform analytics

Additional privileges may be added in the future.

---

# Authentication Flow

Authorization depends on authenticated sessions.

Flow:

1. user logs in
2. JWT token is generated
3. token contains role information
4. guards validate access permissions
5. ownership checks are executed

---

# JWT Payload

Example JWT payload:

```json id="8wh6ty"
{
  "sub": "user-id",
  "email": "user@email.com",
  "role": "USER"
}
```

---

# Authorization Layers

The platform uses multiple security layers.

---

## Layer 1 — Authentication

Handled by:

* JWT strategy
* AuthGuard

Ensures:

* valid token
* authenticated session

---

## Layer 2 — Role Authorization

Handled by:

* Roles decorator
* RolesGuard

Ensures:

* user has required role
* route access is permitted

---

## Layer 3 — Ownership Validation

Business-level security validation.

Ensures users can only access:

* their own accounts
* their own transactions
* their own invoices
* their own vehicles

This is one of the most important security layers.

---

# Example Protected Route

Example:

```typescript id="8abjtc"
@Roles(UserRole.ADMIN)
@Get('/users')
findAllUsers()
```

---

# Ownership Security

Even authenticated users cannot access data from other users.

Example validation:

```typescript id="0fzk53"
if (resource.userId !== currentUser.id) {
  throw new ForbiddenException();
}
```

---

# Financial Security

Financial operations require strict ownership validation.

Protected operations:

* transfers
* invoice payments
* account balance updates
* recurring transactions
* vehicle expenses

---

# Future RBAC Expansion

Future SaaS architecture may include:

* custom roles
* workspace permissions
* team permissions
* granular permissions
* organization-level RBAC

---

# Future Permission Model

Future permissions may become action-based.

Examples:

| Permission          | Description         |
| ------------------- | ------------------- |
| transactions:create | Create transactions |
| transactions:update | Update transactions |
| accounts:delete     | Delete accounts     |
| reports:view        | View reports        |

---

# Security Principles

Authorization model principles:

* least privilege
* ownership isolation
* secure defaults
* explicit authorization
* financial operation protection

---

# Admin Route Protection

Administrative endpoints should always require:

```typescript id="5vnxj5"
@Roles(UserRole.ADMIN)
```

And:

```typescript id="9r9mrm"
@UseGuards(JwtAuthGuard, RolesGuard)
```

---

# Audit Integration

Sensitive operations may generate audit logs.

Examples:

* user creation
* role changes
* financial reversals
* account deletions

---

# Future Enterprise Features

Planned future enterprise authorization features:

* multi-tenant isolation
* organization roles
* team workspaces
* permission inheritance
* SSO integration

---

# Status

JWT authentication:
✅ Implemented

Roles:
✅ Active

Ownership validation:
✅ Active

Granular permissions:
🚧 Planned

Enterprise RBAC:
🚧 Planned
