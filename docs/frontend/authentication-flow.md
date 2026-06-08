# Frontend Authentication Flow

# Overview

The CCP frontend authentication system is based on JWT authentication integrated with the NestJS backend.

The authentication flow was designed for:

* security
* scalability
* SaaS readiness
* protected routes
* persistent sessions

---

# Authentication Strategy

The frontend uses:

* JWT authentication
* protected layouts
* middleware validation
* HTTP-only cookies (planned)
* role-aware rendering

---

# Main Authentication Flow

```text id="x7m2tw"
User Login
    ↓
Backend Validation
    ↓
JWT Generation
    ↓
Token Storage
    ↓
Protected Access
```

---

# Login Flow

## Step 1 — User Credentials

The user submits:

* email
* password

---

## Step 2 — API Authentication

Frontend sends request to:

```text id="k3m9vr"
/auth/login
```

---

## Step 3 — Backend Validation

Backend validates:

* credentials
* password hash
* user existence

---

## Step 4 — JWT Generation

Backend generates:

* access token
* user payload

---

## Step 5 — Frontend Storage

Current strategy:

* local storage (temporary)
* memory state

Planned strategy:

* HTTP-only cookies

---

# Protected Route Flow

Protected routes require:

* authenticated user
* valid JWT
* optional permissions

---

# Protected Layout Strategy

Example:

```text id="q5m8tx"
src/app/(protected)
```

Protected layouts centralize:

* session validation
* redirects
* authorization checks

---

# Middleware Strategy

Next.js middleware validates:

* token existence
* authentication state
* access permissions

---

# Current User Endpoint

Frontend validates active session using:

```text id="f8m2qp"
/auth/me
```

This endpoint returns:

* authenticated user
* roles
* permissions

---

# Session Persistence

Current behavior:

* session survives page refresh
* frontend restores user state

Future improvements:

* refresh tokens
* silent renewal
* session expiration management

---

# Logout Flow

Logout flow:

```text id="v8m3pk"
User Logout
    ↓
Token Removal
    ↓
Session Cleanup
    ↓
Redirect to Login
```

---

# Authorization Strategy

Authorization layers:

| Layer      | Responsibility              |
| ---------- | --------------------------- |
| Middleware | route protection            |
| Layouts    | protected rendering         |
| Components | role-based UI               |
| Backend    | real permission enforcement |

---

# Role-Based Rendering

Frontend supports conditional rendering based on:

* user role
* permissions
* ownership

Example:

```tsx id="p6m2tx"
{user.role === 'ADMIN' && <AdminPanel />}
```

---

# Current Security Measures

Implemented:

* JWT validation
* protected routes
* auth middleware
* session persistence

---

# Planned Security Improvements

Planned:

* HTTP-only cookies
* refresh tokens
* MFA authentication
* session expiration handling
* device tracking

---

# API Integration

Authentication requests are centralized inside:

```text id="q8m4vr"
src/services/auth.service.ts
```

Responsibilities:

* login
* logout
* current user validation
* token handling

---

# Context Management

Authentication state is managed through:

```text id="r7m2vp"
AuthContext
```

Responsibilities:

* authenticated user
* loading state
* login/logout actions

---

# Future SaaS Authentication

Future SaaS features:

* workspaces
* organization switching
* RBAC
* subscription-based access

---

# Current Status

JWT login:
✅ Implemented

Protected routes:
✅ Implemented

Middleware:
✅ Partial

HTTP-only cookies:
🚧 Planned

Refresh tokens:
🚧 Planned
