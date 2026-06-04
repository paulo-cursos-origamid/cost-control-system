# Module Communication

## Overview

This document describes how CCP backend modules communicate internally.

The system follows a modular monolith architecture with strong domain separation.

Each module owns its own responsibilities while interacting through services and shared business flows.

---

# Architectural Principles

Core principles:

- modular isolation
- domain-driven organization
- service-oriented communication
- financial consistency
- transactional integrity
- low coupling
- high cohesion

---

# Communication Style

Modules communicate primarily through:

- NestJS services
- dependency injection
- Prisma transactions
- shared financial engine
- internal orchestration

There is currently no message broker in production.

Future versions may introduce:

- RabbitMQ
- Kafka
- event-driven architecture

---

# Core Financial Architecture

The financial ecosystem revolves around:

```text
Transactions
    ↓
Financial Engine
    ↓
Ledger
    ↓
Accounts
    ↓
Reports

