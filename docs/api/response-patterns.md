# API Response Patterns

## Overview

This document defines the standard API response structure used across the CCP platform.

The goal is to provide:

* consistency
* predictability
* frontend integration simplicity
* better debugging
* standardized error handling

---

# Success Response Pattern

Standard success response:

```json
{
  "success": true,
  "statusCode": 200,
  "path": "/api/accounts",
  "message": "Operation completed successfully",
  "data": {}
}
```

---

# Success Response Fields

| Field      | Description                 |
| ---------- | --------------------------- |
| success    | Indicates operation success |
| statusCode | HTTP status code            |
| path       | Request path                |
| message    | Human-readable message      |
| data       | Response payload            |

---

# Example — Single Resource

```json
{
  "success": true,
  "statusCode": 200,
  "path": "/api/accounts/1",
  "message": "Account retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Main Account",
    "balance": 1000
  }
}
```

---

# Example — List Response

```json
{
  "success": true,
  "statusCode": 200,
  "path": "/api/transactions",
  "message": "Transactions retrieved successfully",
  "data": [
    {}
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

---

# Pagination Pattern

Paginated endpoints should return:

```json
"meta": {
  "page": 1,
  "limit": 20,
  "total": 120,
  "totalPages": 6
}
```

---

# Error Response Pattern

Standard error response:

```json
{
  "success": false,
  "statusCode": 400,
  "path": "/api/accounts",
  "message": "Validation failed",
  "timestamp": "2026-06-04T00:00:00.000Z"
}
```

---

# Validation Error Pattern

Validation errors should return:

```json
{
  "success": false,
  "statusCode": 400,
  "path": "/api/users",
  "message": {
    "message": [
      "email must be valid",
      "password must be longer than 8 characters"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

---

# Unauthorized Response

```json
{
  "success": false,
  "statusCode": 401,
  "path": "/api/accounts",
  "message": "Unauthorized"
}
```

---

# Forbidden Response

```json
{
  "success": false,
  "statusCode": 403,
  "path": "/api/admin",
  "message": "Forbidden resource"
}
```

---

# Not Found Response

```json
{
  "success": false,
  "statusCode": 404,
  "path": "/api/accounts/999",
  "message": "Account not found"
}
```

---

# Internal Server Error Response

```json
{
  "success": false,
  "statusCode": 500,
  "path": "/api/transactions",
  "message": "Internal server error"
}
```

---

# Financial Error Responses

Financial operations may return domain-specific errors.

Example:

```json
{
  "success": false,
  "statusCode": 400,
  "path": "/api/transfers",
  "message": "Insufficient account balance"
}
```

---

# Response Philosophy

The API response model follows:

* explicit success/failure
* consistent structure
* frontend-friendly payloads
* audit-friendly logs
* SaaS-ready standardization

---

# Timestamp Usage

Error responses may include timestamps for:

* debugging
* tracing
* monitoring
* audit logs

---

# Future Improvements

Planned improvements:

* request tracing IDs
* distributed correlation IDs
* localized error messages
* structured error codes
* machine-readable financial error codes

---

# Status

Response standard:
✅ Active

Global exception filter:
✅ Implemented

Validation standardization:
✅ Active
