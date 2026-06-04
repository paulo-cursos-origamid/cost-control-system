# Pagination Patterns

## Overview

The CCP platform uses standardized pagination across all list endpoints.

The pagination system was designed for:

* scalability
* frontend consistency
* predictable API behavior
* SaaS readiness

---

# Standard Query Parameters

All paginated endpoints should support:

| Parameter | Description    |
| --------- | -------------- |
| page      | Current page   |
| limit     | Items per page |
| sortBy    | Sorting field  |
| order     | asc or desc    |

---

# Example Request

```http id="2e3l6n"
GET /api/transactions?page=1&limit=20
```

---

# Standard Response Structure

```json id="3k9v7m"
{
  "success": true,
  "statusCode": 200,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

---

# Meta Object

Pagination metadata:

| Field      | Description           |
| ---------- | --------------------- |
| page       | Current page          |
| limit      | Items per page        |
| total      | Total records         |
| totalPages | Total available pages |

---

# Default Values

Recommended defaults:

| Parameter | Default |
| --------- | ------- |
| page      | 1       |
| limit     | 20      |

---

# Maximum Limits

To prevent abuse:

| Parameter | Maximum |
| --------- | ------- |
| limit     | 100     |

---

# Sorting Pattern

Example:

```http id="0p4x9r"
GET /api/accounts?sortBy=createdAt&order=desc
```

---

# Database Strategy

Pagination should use:

```typescript id="8z2m1w"
skip: (page - 1) * limit,
take: limit
```

---

# Performance Considerations

Large datasets should:

* always be paginated
* avoid loading full collections
* use indexed fields
* support filtering

---

# Frontend Integration

Pagination structure was designed for:

* infinite scroll
* table pagination
* mobile applications
* dashboards

---

# Future Improvements

Planned improvements:

* cursor pagination
* infinite scrolling optimization
* caching strategies
* GraphQL support

---

# Status

Pagination standard:
✅ Active

Frontend compatibility:
✅ Ready

Cursor pagination:
🚧 Planned
