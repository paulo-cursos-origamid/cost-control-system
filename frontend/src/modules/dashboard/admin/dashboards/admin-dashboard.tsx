"use client";

import { Users, Crown, DollarSign, AlertTriangle } from "lucide-react";

import { StatCard } from "@/modules/dashboard/shared/cards/stat-card";
import { SubscriptionsDashboard } from "./subscriptions-dashboard";

import styles from "./admin-dashboard.module.scss";

import { FinancialChart } from "@/modules/dashboard/shared/charts/financial-chart";

import { useDashboard } from "../../hooks/use-dashboard";
import { QuickActions } from "../../shared/quick-actions/quick-actions";

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
      <div className={styles.header}>
        <h1>Dashboard Administrativo</h1>

        <p>Visão geral da plataforma ECP</p>
      </div>

      <div className={styles.grid}>
        <StatCard
          title="Usuários Ativos"
          value={metrics.activeUsers}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Premium"
          value={metrics.premiumUsers}
          icon={<Crown size={20} />}
        />

        <StatCard
          title="Gold"
          value={metrics.goldUsers}
          icon={<Crown size={20} />}
        />

        <StatCard
          title="Vitalício"
          value={metrics.lifetimeUsers}
          icon={<Crown size={20} />}
        />

        <StatCard title="Pagantes" value={metrics.payingUsers} />

        <StatCard
          title="Inadimplentes"
          value={metrics.overdueUsers}
          icon={<AlertTriangle size={20} />}
        />

        <StatCard
          title="MRR"
          value={`R$ ${metrics.mrr.toLocaleString("pt-BR")}`}
          icon={<DollarSign size={20} />}
        />

        <StatCard
          title="ARR"
          value={`R$ ${metrics.arr.toLocaleString("pt-BR")}`}
          icon={<DollarSign size={20} />}
        />

        <StatCard title="Novos Clientes" value={metrics.newCustomers} />

        <StatCard title="Cancelamentos" value={metrics.cancellations} />
      </div>
      <div className={styles.section}>
        <QuickActions />
      </div>

      <div className={styles.section}>
        <FinancialChart data={cashflow} />
      </div>

      <div className={styles.section}>
        <SubscriptionsDashboard />
      </div>
    </div>
  );
}
