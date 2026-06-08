# Frontend Folder Structure

# Overview

The CCP frontend follows a modular and scalable folder organization strategy.

The structure was designed to support:

* scalability
* reusable components
* SaaS growth
* maintainability
* domain separation

---

# Main Structure

Example structure:

```text id="x7m2tw"
src
├── app
├── components
├── services
├── hooks
├── contexts
├── forms
├── styles
├── types
├── utils
└── schemas
```

---

# App Directory

Location:

```text id="k3m9vr"
src/app
```

Responsible for:

* routes
* layouts
* pages
* route groups
* protected areas

---

# App Router Structure

Example:

```text id="q5m8tx"
src/app
├── login
├── dashboard
├── management
│   ├── users
│   ├── accounts
│   ├── categories
│   └── transactions
├── reports
└── settings
```

---

# Components Directory

Location:

```text id="f8m2qp"
src/components
```

Contains reusable UI components.

---

# Component Organization

Components are grouped by responsibility.

Example:

```text id="v8m3pk"
src/components
├── layout
├── forms
├── tables
├── dashboard
├── cards
├── modals
└── ui
```

---

# Layout Components

Responsible for:

* sidebar
* header
* breadcrumbs
* containers
* navigation

Example:

```text id="p6m2tx"
src/components/layout
├── Header
├── Sidebar
├── Breadcrumbs
└── LayoutContainer
```

---

# Form Components

Responsible for reusable form logic.

Example:

```text id="q8m4vr"
src/components/forms
├── Input
├── InputField
├── FormBody
├── FormCreate
└── FormEdit
```

---

# Tables

Responsible for reusable data visualization.

Example:

```text id="r7m2vp"
src/components/tables
├── FormTable
├── TablePagination
└── TableFilters
```

---

# Dashboard Components

Responsible for analytics UI.

Example:

```text id="x5m8tw"
src/components/dashboard
├── DashboardCard
├── SummaryCard
├── FinancialChart
└── AnalyticsWidget
```

---

# Services Directory

Location:

```text id="n4m9tx"
src/services
```

Responsible for API communication.

Example:

```text id="v3m7pk"
src/services
├── api.ts
├── auth.service.ts
├── transactions.service.ts
└── accounts.service.ts
```

---

# Hooks Directory

Location:

```text id="k8m4vq"
src/hooks
```

Contains reusable React hooks.

Examples:

* authentication hooks
* table hooks
* pagination hooks
* form hooks

---

# Contexts Directory

Location:

```text id="m5q8vr"
src/contexts
```

Responsible for global application state.

Examples:

* AuthContext
* ThemeContext
* SidebarContext

---

# Forms Directory

Location:

```text id="q2m8tx"
src/forms
```

Contains domain-based form schemas and reusable form logic.

---

# Styles Directory

Location:

```text id="w7m3pk"
src/styles
```

Contains:

* global styles
* SCSS variables
* mixins
* responsive helpers

---

# Types Directory

Location:

```text id="p4m9vq"
src/types
```

Responsible for centralized TypeScript types.

Examples:

* API types
* DTOs
* enums
* UI types

---

# Utils Directory

Location:

```text id="f6m2tx"
src/utils
```

Contains reusable utility functions.

Examples:

* formatters
* parsers
* validators
* date helpers

---

# Schemas Directory

Location:

```text id="x9m4vr"
src/schemas
```

Contains validation schemas.

Examples:

* Zod schemas
* form validation
* DTO validation helpers

---

# SCSS Strategy

Each component owns its style file.

Example:

```text id="n8m2pk"
Input.tsx
input.module.scss
```

Benefits:

* isolation
* maintainability
* scalability

---

# Modular Philosophy

Each domain should remain isolated.

Example:

```text id="r4m8tx"
management/users
```

should contain:

* pages
* forms
* services
* validation
* table configuration

---

# Future Scalability

The structure is prepared for:

* multi-tenant SaaS
* RBAC
* analytics expansion
* mobile adaptation
* microfrontend possibilities

---

# Current Status

Folder structure:
✅ Organized

Reusable components:
✅ Advanced

Scalability:
✅ Strong

SaaS readiness:
✅ Prepared
