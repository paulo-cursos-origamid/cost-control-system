"use client";

import { AlertTriangle, Crown, DollarSign, Users } from "lucide-react";

import { StatCard } from "@/modules/dashboard/shared/cards/stat-card";

import styles from "./admin-dashboard.module.scss";
import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";
import { FinancialChart } from "@/modules/dashboard/shared/charts/financial-chart";
import { DashboardGrid } from "@/modules/dashboard/shared/grid/dashboard-grid";
import { PageHeader } from "@/modules/dashboard/shared/page-header/page-header";
import { QuickActions } from "@/modules/dashboard/shared/quick-actions/quick-actions";
import { DashboardSection } from "@/modules/dashboard/shared/section/dashboard-section";
import { FinancialSummary } from "../../components/financial-summary/financial-summary";
import { FleetCosts } from "../../components/fleet-costs/fleet-costs";
import { FleetSummary } from "../../components/fleet-summary/fleet-summary";
import { LatestFuelSupplies } from "../../components/latest-fuel-supplies/latest-fuel-supplies";
import { LatestTransactions } from "../../components/latest-transactions/latest-transactions";
import { SubscriptionsDashboard } from "../subscriptions-dashboard";
import { FinancialKpiCard } from "@/modules/dashboard/shared/cards/financial-kpi-card/financial-kpi-card";
import { TopCategories } from "../../components/top-categories/top-categories";

export function AdminDashboard() {
  const { cashflow, financial, vehicles, loading, reload } = useDashboard();

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

      {financial && (
        <DashboardGrid>
          <FinancialKpiCard
            title="Receitas"
            value={financial.summary.income}
            variant="income"
          />

          <FinancialKpiCard
            title="Despesas"
            value={financial.summary.expense}
            variant="expense"
          />

          <FinancialKpiCard
            title="Saldo"
            value={financial.summary.balance}
            variant="balance"
          />
        </DashboardGrid>
      )}
      {/* ========================= */}
      {/* FLUXO FINANCEIRO */}
      {/* ========================= */}

      {financial && (
        <div className={styles.analyticsGrid}>
          <DashboardSection title="Fluxo Financeiro">
            <FinancialChart data={cashflow} />
          </DashboardSection>

          <DashboardSection title="Categorias">
            <TopCategories categories={financial.topCategories} />
          </DashboardSection>
        </div>
      )}
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
