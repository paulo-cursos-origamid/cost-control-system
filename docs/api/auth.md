# Authentication API

## Overview

The Authentication API is responsible for user authentication and authorization inside the CCP platform.

It manages:

* user login
* JWT generation
* protected routes
* role validation
* authenticated sessions

---

# Authentication Flow

Authentication flow:

1. User submits credentials
2. Credentials are validated
3. JWT token is generated
4. Token is returned to client
5. Protected routes validate token
6. Request user context becomes available

---

# Base Route

```http
/api/auth
```

---

# Endpoints

## Login

Authenticate user and generate JWT token.

### Endpoint

```http
POST /api/auth/login
```

---

# Request Body

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

---

# Success Response

```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@email.com",
    "role": "USER"
  }
}
```

---

# Error Response

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

# JWT Authentication

Protected endpoints require:

```http
Authorization: Bearer <token>
```

---

# Token Structure

JWT payload example:

```json
{
  "sub": "user_id",
  "email": "user@email.com",
  "role": "USER"
}
```

---

# Roles

Supported roles:

* ADMIN
* USER
* MANAGER
* SUPPORT
---

# Guards

Authentication is protected by:

* JwtAuthGuard
* RolesGuard

---

# Security Rules

Important security rules:

* passwords are hashed using bcrypt
* JWT tokens are signed securely
* invalid credentials return 401
* protected routes require authentication
* role-based access is enforced

---

# Authentication Headers

Example:

```http
Authorization: Bearer eyJhbGciOi...
```

---

# Protected Routes

Examples of protected modules:

* accounts
* transactions
* reports
* transfers
* credit-cards
* invoices

---

# Token Expiration

JWT tokens expire according to environment configuration.

Example:

```env
JWT_EXPIRES_IN=7d
```

---

# Environment Variables

Required variables:

```env
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

---

# Future Improvements

Planned improvements:

* refresh tokens
* httpOnly cookies
* multi-device sessions
* OAuth providers
* Google login
* 2FA authentication
* biometric authentication

---

# Status

JWT authentication:
✅ Implemented

Role validation:
✅ Implemented

Refresh tokens:
🚧 Planned

2FA:
🚧 Planned
