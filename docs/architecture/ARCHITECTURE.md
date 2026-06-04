# CCP Backend Architecture

# Overview

CCP (Centro de Controle Pessoal) é uma plataforma financeira modular baseada em eventos financeiros reais.

O sistema foi projetado utilizando:

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Domain Modularization

Objetivos principais:

* Escalabilidade
* Segurança financeira
* Precisão contábil
* Multi módulo
* Preparação SaaS

---

# Core Architecture

O sistema é baseado em:

```txt
Transaction
→ Ledger Entry
→ Account Balance
```

O saldo nunca é considerado fonte primária.

A fonte da verdade é o Ledger.

---

# Main Modules

## Auth

Responsável por:

* Login
* JWT
* Registro
* Guards
* Proteção de rotas

---

## Accounts

Responsável por:

* Contas bancárias
* Carteiras
* Investimentos
* Saldo

---

## Categories

Responsável por:

* Categorias financeiras
* Categorias padrão
* Categorias de veículos
* Categorias hierárquicas

---

## Transactions

Responsável por:

* Receitas
* Despesas
* Paginação
* Filtros
* Soft delete
* Integração financeira

---

## Ledger

Responsável por:

* Créditos
* Débitos
* Histórico financeiro
* Recalcular saldo

IMPORTANTE:
Nenhum saldo deve ser alterado manualmente.

---

## Transfers

Responsável por:

* Transferência entre contas
* Débito/Crédito duplo
* Integridade financeira

---

## Credit Cards

Responsável por:

* Cartões
* Limites
* Fechamento
* Vencimento

---

## Credit Card Invoices

Responsável por:

* Faturas
* Agrupamento automático
* Pagamento
* Controle de status

---

## Vehicles

Responsável por:

* Gestão veicular
* Quilometragem
* Custos

---

## Fuel Supplies

Responsável por:

* Abastecimentos
* Consumo médio
* Histórico de tanque cheio

---

## Maintenance

Responsável por:

* Manutenções
* Custos
* Próximas revisões

---

# Financial Flow

## Expense Flow

```txt
Transaction EXPENSE
→ Ledger DEBIT
→ Recalculate Balance
```

---

## Income Flow

```txt
Transaction INCOME
→ Ledger CREDIT
→ Recalculate Balance
```

---

## Credit Card Flow

```txt
Transaction
→ Invoice Engine
→ Invoice
→ Payment
→ Ledger DEBIT
→ Balance Update
```

---

# Database Strategy

## ORM

Prisma ORM

## Database

PostgreSQL

## Strategy

* Soft delete
* UUID IDs
* Audit timestamps
* Financial indexing

---

# Security Strategy

## Authentication

JWT

## Authorization

Em implementação:

* Roles
* Permissions
* RBAC

---

# Future SaaS Architecture

Planejado:

```txt
Workspace
 ├── Users
 ├── Roles
 ├── Permissions
 ├── Teams
 └── Billing
```

---

# Scalability Goals

## Planned

* Redis cache
* Queue workers
* Websockets
* Horizontal scaling
* ECS/Fargate
* Event driven architecture

---

# Deployment Strategy

## Current

* Docker Compose
* Railway PostgreSQL

## Planned

* AWS EC2
* ECS
* Fargate
* Nginx reverse proxy

---

# Design Principles

## Financial Integrity First

O sistema prioriza consistência financeira acima de performance visual.

## Ledger Driven

Toda movimentação financeira gera ledger.

## Modularization

Cada domínio possui:

* module
* controller
* service
* dto
* prisma interaction

## Soft Delete

Dados financeiros nunca devem ser removidos definitivamente.

---

# Current Status

Backend:
✅ Strong foundation

Financial engine:
✅ Stable

Scalability:
✅ Ready for growth

Frontend:
🚧 Starting
