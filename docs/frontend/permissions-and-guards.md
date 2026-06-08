# Permissions and Guards

# Overview

The CCP frontend authorization system controls access to:

* pages
* routes
* UI components
* dashboard sections
* financial operations

The frontend authorization layer complements backend security.

---

# Security Philosophy

Frontend permissions are designed to:

* improve UX
* hide unauthorized actions
* organize navigation
* support SaaS scalability

IMPORTANT:

```text id="x7m2tw"
Frontend permissions NEVER replace backend validation.
```

Backend remains the final authority.

---

# Authorization Layers

The frontend authorization system contains:

| Layer      | Responsibility              |
| ---------- | --------------------------- |
| Middleware | route protection            |
| Layouts    | access control              |
| Components | conditional rendering       |
| Backend    | real permission enforcement |

---

# Authentication vs Authorization

## Authentication

Authentication verifies:

```text id="k3m9vr"
Who the user is
```

---

## Authorization

Authorization verifies:

```text id="q5m8tx"
What the user can access
```

---

# Protected Routes

Protected routes require:

* authenticated user
* valid session
* optional role validation

---

# Middleware Protection

Middleware responsibilities:

* validate session
* redirect unauthenticated users
* block unauthorized access

Example:

```text id="f8m2qp"
middleware.ts
```

---

# Protected Layouts

Protected layouts centralize authorization logic.

Example:

```text id="v8m3pk"
src/app/(protected)
```

Responsibilities:

* session validation
* permission checks
* protected rendering

---

# Role-Based Rendering

UI components can be conditionally rendered based on roles.

Example:

```tsx id="p6m2tx"
{user.role === 'ADMIN' && <AdminPanel />}
```

---

# Planned Roles

Current planned roles:

| Role    | Responsibility            |
| ------- | ------------------------- |
| ADMIN   | full access               |
| USER    | personal financial access |
| MANAGER | organizational management |
| VIEWER  | read-only access          |

---

# Planned Permission System

Future permissions include:

* account management
* transaction approval
* report visibility
* vehicle management
* invoice management

---

# Navigation Guards

Sidebar and navigation menus are permission-aware.

Example:

```text id="q8m4vr"
Admin links hidden for regular users
```

---

# Dashboard Guards

Dashboard widgets can be role-restricted.

Examples:

* admin analytics
* billing analytics
* SaaS metrics

---

# Component-Level Permissions

Reusable permission wrappers are planned.

Example:

```tsx id="r7m2vp"
<Can permission="MANAGE_USERS">
  <UserManagement />
</Can>
```

---

# Current User Validation

Frontend validates session using:

```text id="x5m8tw"
/auth/me
```

This endpoint returns:

* authenticated user
* role
* permissions

---

# Multi-Tenant Future

Future SaaS permissions will support:

* workspaces
* tenant isolation
* organization roles
* team permissions

---

# RBAC Strategy

Future RBAC architecture:

```text id="n4m9tx"
Workspace
 ├── Roles
 ├── Permissions
 ├── Teams
 └── Users
```

---

# Security Principles

Frontend permissions follow:

* least privilege
* role isolation
* ownership validation
* protected rendering

---

# Backend Integration

Backend remains responsible for:

* final authorization
* ownership checks
* financial validation
* secure operations

---

# Unauthorized Flow

Unauthorized flow:

```text id="v3m7pk"
Unauthorized Access
    ↓
Frontend Redirect
    ↓
Error Page or Login
```

---

# Planned Improvements

Planned:

* permission hooks
* reusable guard components
* dynamic RBAC
* tenant-aware permissions
* subscription-based access

---

# Current Status

Protected routes:
✅ Implemented

Role rendering:
🚧 Partial

RBAC:
🚧 Planned

Permission wrappers:
🚧 Planned

Tenant permissions:
🚧 Future
