"use client";

import { Wallet, TrendingUp, TrendingDown, Car } from "lucide-react";

import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";

import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const { cards, financial, vehicles, loading } = useDashboard();

  if (loading || !cards || !financial || !vehicles) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Dashboard</h1>

          <p className={styles.dashboardSubtitle}>Visão geral do sistema ECP</p>
        </div>
      </div>

      {/* KPIs */}

      <div className={styles.statsGrid}>
        <StatCard
          title="Saldo"
          value={`R$ ${cards.balance.toFixed(2)}`}
          icon={<Wallet size={22} />}
        />

        <StatCard
          title="Receitas"
          value={`R$ ${cards.income.toFixed(2)}`}
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Despesas"
          value={`R$ ${cards.expense.toFixed(2)}`}
          icon={<TrendingDown size={22} />}
        />

        <StatCard
          title="Veículos"
          value={cards.vehicles}
          icon={<Car size={22} />}
        />
      </div>

      {/* RESUMOS */}

      <div className={styles.financialGrid}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Resumo Financeiro</h3>

          <div className={styles.summaryList}>
            <SummaryItem
              label="Receitas"
              value={`R$ ${financial.summary.income.toFixed(2)}`}
            />

            <SummaryItem
              label="Despesas"
              value={`R$ ${financial.summary.expense.toFixed(2)}`}
            />

            <SummaryItem
              label="Saldo"
              value={`R$ ${financial.summary.balance.toFixed(2)}`}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Custos da Frota</h3>

          <div className={styles.summaryList}>
            <SummaryItem
              label="Combustível"
              value={`R$ ${vehicles.costs.fuel.toFixed(2)}`}
            />

            <SummaryItem
              label="Manutenção"
              value={`R$ ${vehicles.costs.maintenance.toFixed(2)}`}
            />

            <SummaryItem
              label="Total"
              value={`R$ ${vehicles.costs.total.toFixed(2)}`}
            />
          </div>
        </section>
      </div>

      {/* TRANSAÇÕES */}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Últimas Transações</h3>

        <div className={styles.userList}>
          {financial.latestTransactions.length === 0 ? (
            <p>Nenhuma transação encontrada.</p>
          ) : (
            financial.latestTransactions.map((transaction) => (
              <div key={transaction.id} className={styles.userItem}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{transaction.title}</span>

                  <span className={styles.userEmail}>{transaction.type}</span>
                </div>

                <strong>R$ {transaction.amount.toFixed(2)}</strong>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ABASTECIMENTOS */}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Últimos Abastecimentos</h3>

        <div className={styles.userList}>
          {vehicles.latestFuelSupplies.length === 0 ? (
            <p>Nenhum abastecimento encontrado.</p>
          ) : (
            vehicles.latestFuelSupplies.map((fuel) => (
              <div key={fuel.id} className={styles.userItem}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {fuel.vehicle?.name ?? "Veículo"}
                  </span>
                </div>

                <strong>R$ {fuel.totalAmount.toFixed(2)}</strong>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <span className={styles.statTitle}>
          {title}
        </span>

        <div className={styles.statIcon}>
          {icon}
        </div>
      </div>

      <div className={styles.statValue}>
        {value}
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.summaryItem}>
      <span className={styles.summaryLabel}>
        {label}
      </span>

      <strong className={styles.summaryValue}>
        {value}
      </strong>
    </div>
  );
}