# Frontend API Integration

# Overview

The CCP frontend communicates with the NestJS backend through a centralized API integration layer.

The API architecture was designed for:

* scalability
* maintainability
* reusable requests
* centralized authentication
* error standardization

---

# Integration Philosophy

The frontend follows an API-first architecture.

Responsibilities are separated between:

* UI rendering
* state management
* API communication
* validation
* authentication

---

# API Structure

Main API layer location:

```text id="x7m2tw"
src/services
```

Example:

```text id="k3m9vr"
src/services
├── api.ts
├── auth.service.ts
├── accounts.service.ts
├── transactions.service.ts
├── reports.service.ts
└── vehicles.service.ts
```

---

# Central API Client

The frontend uses a centralized API client.

Example:

```text id="q5m8tx"
api.ts
```

Responsibilities:

* base URL
* authentication headers
* interceptors
* error handling
* token injection

---

# Request Flow

Typical request flow:

```text id="f8m2qp"
Frontend Component
    ↓
Service Layer
    ↓
API Client
    ↓
NestJS Backend
```

---

# Authentication Integration

Authenticated requests include:

* JWT token
* authorization headers
* session validation

Example:

```http id="v8m3pk"
Authorization: Bearer <token>
```

---

# Service Organization

Each domain owns its own service file.

Example:

```text id="p6m2tx"
transactions.service.ts
```

Responsibilities:

* transaction CRUD
* pagination
* filters
* summaries

---

# Example Service Structure

Example:

```ts id="q8m4vr"
export const getTransactions = async () => {
  return api.get('/transactions');
};
```

---

# Error Handling Strategy

The frontend centralizes API errors.

Handled cases:

* unauthorized requests
* validation errors
* expired tokens
* server errors
* network failures

---

# Standard API Response Pattern

Backend responses follow standardized structures.

Example:

```json id="r7m2vp"
{
  "success": true,
  "data": {},
  "message": "Operation completed"
}
```

---

# Pagination Integration

Paginated endpoints support:

* page
* limit
* filters
* sorting

Example:

```http id="x5m8tw"
/transactions?page=1&limit=10
```

---

# Filtering Integration

Filters are sent as query parameters.

Examples:

* category
* account
* date range
* transaction type

---

# Financial Module Integration

Integrated domains:

| Domain       | Integration        |
| ------------ | ------------------ |
| Accounts     | CRUD + balances    |
| Transactions | CRUD + summaries   |
| Transfers    | internal transfers |
| Invoices     | invoice management |
| Reports      | analytics          |
| Vehicles     | vehicle operations |

---

# Current Authentication Strategy

Current token strategy:

* local storage
* React Context

Planned strategy:

* HTTP-only cookies
* refresh tokens

---

# Interceptors

Future interceptor responsibilities:

* token refresh
* automatic logout
* centralized errors
* retry logic

---

# Environment Variables

API URLs are configured through:

```env id="n4m9tx"
NEXT_PUBLIC_API_URL=
```

---

# Security Principles

Frontend API integration follows:

* token validation
* protected requests
* ownership enforcement
* centralized auth handling

---

# Future Improvements

Planned improvements:

* React Query
* TanStack Query
* optimistic updates
* request caching
* websocket integration
* background synchronization

---

# Example Integration Flow

```text id="v3m7pk"
Frontend Action
    ↓
Service Layer
    ↓
API Request
    ↓
Backend Validation
    ↓
Financial Processing
    ↓
Frontend Update
```

---

# Current Status

API integration:
✅ Operational

Authentication integration:
✅ Implemented

Error handling:
🚧 Partial

React Query:
🚧 Planned

Realtime sync:
🚧 Planned
