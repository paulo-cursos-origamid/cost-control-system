"use client";

import { AlertTriangle, Crown, DollarSign, Users } from "lucide-react";

import { useDashboard } from "../../hooks/use-dashboard";

import { FinancialChart } from "../../shared/charts/financial-chart";
import { QuickActions } from "../../shared/quick-actions/quick-actions";

import { StatCard } from "@/modules/dashboard/shared/cards/stat-card";

import { SubscriptionsDashboard } from "./subscriptions-dashboard";

import styles from "./admin-dashboard.module.scss";

export function AdminDashboard() {
  const { cashflow } = useDashboard();

  const metrics = {
    activeUsers: 156,
    premiumUsers: 72,
    goldUsers: 48,
    lifetimeUsers: 36,

    payingUsers: 142,
    overdueUsers: 14,

    mrr: 8520,
    arr: 102240,

    newCustomers: 23,
    cancellations: 2,
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard Administrativo</h1>

        <p>Visão geral da plataforma ECP</p>
      </header>

      {/* ========================= */}
      {/* MÉTRICAS */}
      {/* ========================= */}

      <section className={styles.section}>
        <div className={styles.grid}>
          <StatCard
            title="Usuários Ativos"
            value={metrics.activeUsers}
            icon={<Users size={20} />}
            variant="users"
          />

          <StatCard
            title="Premium"
            value={metrics.premiumUsers}
            icon={<Crown size={20} />}
            variant="premium"
          />

          <StatCard
            title="Gold"
            value={metrics.goldUsers}
            icon={<Crown size={20} />}
            variant="gold"
          />

          <StatCard
            title="Vitalício"
            value={metrics.lifetimeUsers}
            icon={<Crown size={20} />}
            variant="lifetime"
          />

          <StatCard
            title="Pagantes"
            value={metrics.payingUsers}
            icon={<DollarSign size={20} />}
            variant="paid"
          />

          <StatCard
            title="Inadimplentes"
            value={metrics.overdueUsers}
            icon={<AlertTriangle size={20} />}
            variant="late"
          />

          <StatCard
            title="MRR"
            value={`R$ ${metrics.mrr.toLocaleString("pt-BR")}`}
            icon={<DollarSign size={20} />}
            variant="mrr"
          />

          <StatCard
            title="ARR"
            value={`R$ ${metrics.arr.toLocaleString("pt-BR")}`}
            icon={<DollarSign size={20} />}
            variant="arr"
          />

          <StatCard
            title="Novos Clientes"
            value={metrics.newCustomers}
            icon={<Users size={20} />}
            variant="new"
          />

          <StatCard
            title="Cancelamentos"
            value={metrics.cancellations}
            icon={<AlertTriangle size={20} />}
            variant="cancelled"
          />
        </div>
      </section>

      {/* ========================= */}
      {/* AÇÕES RÁPIDAS */}
      {/* ========================= */}

      <section className={styles.section}>
        <QuickActions />
      </section>

      {/* ========================= */}
      {/* FLUXO FINANCEIRO */}
      {/* ========================= */}

      <section className={styles.section}>
        <FinancialChart data={cashflow} />
      </section>

      {/* ========================= */}
      {/* ASSINATURAS */}
      {/* ========================= */}

      <section className={styles.section}>
        <SubscriptionsDashboard />
      </section>
    </div>
  );
}
