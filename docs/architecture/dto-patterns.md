# DTO Patterns

## Overview

The CCP platform follows a DTO-first architecture using NestJS and class-validator.

DTOs are responsible for:

* request validation
* payload standardization
* API consistency
* security
* serialization

---

# DTO Philosophy

The platform uses DTOs to ensure:

* strict request validation
* predictable API behavior
* safe data exposure
* scalable architecture
* frontend consistency

---

# DTO Types

Main DTO categories:

| DTO Type     | Purpose                    |
| ------------ | -------------------------- |
| Create DTO   | Resource creation          |
| Update DTO   | Resource updates           |
| Query DTO    | Filtering and pagination   |
| Response DTO | API output standardization |

---

# Create DTO Pattern

Example:

```typescript id="zcb7bn"
export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsOptional()
  @IsNumber()
  initialBalance?: number;
}
```

---

# Update DTO Pattern

Update DTOs should use PartialType.

Example:

```typescript
```
