"use client";

import { AlertTriangle, Crown, DollarSign, Users } from "lucide-react";

import { useDashboard } from "../../hooks/use-dashboard";

import { FinancialChart } from "../../shared/charts/financial-chart";
import { QuickActions } from "../../shared/quick-actions/quick-actions";

import { StatCard } from "@/modules/dashboard/shared/cards/stat-card";

import { SubscriptionsDashboard } from "./subscriptions-dashboard";

import styles from "./admin-dashboard.module.scss";
import { FinancialSummary } from "../components/financial-summary/financial-summary";
import { FleetSummary } from "../components/fleet-summary/fleet-summary";
import { LatestTransactions } from "../components/latest-transactions/latest-transactions";

import { FleetCosts } from "../components/fleet-costs/fleet-costs";

import { LatestFuelSupplies } from "../components/latest-fuel-supplies/latest-fuel-supplies";
import { PageHeader } from "../../shared/page-header/page-header";
import { DashboardGrid } from "../../shared/grid/dashboard-grid";
import { DashboardSection } from "../../shared/section/dashboard-section";

export function AdminDashboard() {
  const { cashflow, financial, vehicles } = useDashboard();

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
      <PageHeader
        title="Dashboard Administrativo"
        subtitle="Visão geral da plataforma ECP"
      />

      {/* ========================= */}
      {/* MÉTRICAS */}
      {/* ========================= */}

      <section className={styles.section}>
        <DashboardGrid>
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
            variant="new"
          />

          <StatCard
            title="Cancelamentos"
            value={metrics.cancellations}
            variant="cancelled"
          />
        </DashboardGrid>
      </section>

      {/* ========================= */}
      {/* AÇÕES RÁPIDAS */}
      {/* ========================= */}

      <DashboardSection title="Ações Rapidas">
        <QuickActions />
      </DashboardSection>

      {/* ========================= */}
      {/* FLUXO FINANCEIRO */}
      {/* ========================= */}

      <DashboardSection title="Fluxo Financeiro">
        <FinancialChart data={cashflow} />
      </DashboardSection>

      {/* ========================= */}
      {/* ASSINATURAS */}
      {/* ========================= */}

      <DashboardSection title="Assinantes">
        <SubscriptionsDashboard />
      </DashboardSection>

      {financial && (
        <FinancialSummary
          income={financial.summary.income}
          expense={financial.summary.expense}
          balance={financial.summary.balance}
        />
      )}

      {vehicles && (
        <FleetSummary
          fuel={vehicles.costs.fuel}
          maintenance={vehicles.costs.maintenance}
          total={vehicles.costs.total}
        />
      )}

      {financial && (
        <LatestTransactions transactions={financial.latestTransactions} />
      )}

      {financial && (
        <FinancialSummary
          income={financial.summary.income}
          expense={financial.summary.expense}
          balance={financial.summary.balance}
        />
      )}
      {vehicles && (
        <FleetCosts
          fuel={vehicles.costs.fuel}
          maintenance={vehicles.costs.maintenance}
          total={vehicles.costs.total}
        />
      )}

      {vehicles && (
        <LatestFuelSupplies supplies={vehicles.latestFuelSupplies} />
      )}
    </div>
  );
}
