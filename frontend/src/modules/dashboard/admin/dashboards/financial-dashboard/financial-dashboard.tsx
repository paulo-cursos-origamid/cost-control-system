"use client";

import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";

import styles from "./financial-dashboard.module.scss";
// import { AccountsSummary } from "../../components/accounts-summary/accounts-summary";
import { TopCategories } from "../../components/top-categories/top-categories";
import { LatestTransactions } from "../../components/latest-transactions/latest-transactions";
import { UpcomingBills } from "../../components/upcoming-bills/upcoming-bills";
import { FinancialKpiCard } from "@/modules/dashboard/shared/cards/financial-kpi-card/financial-kpi-card";
import { FinancialChart } from "@/modules/dashboard/shared/charts/financial-chart";
import { PageHeader } from "@/modules/dashboard/shared/page-header/page-header";
import { calculateGrowth } from "@/utils/helpers/calculate-growth";

export function FinancialDashboard() {
  const { financial, cashflow, loading } = useDashboard();

  if (loading || !financial) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard Financeiro"
        subtitle="Controle completo das suas finanças"
      />

      {/* ================= KPI ================= */}

      <div className={styles.kpiGrid}>
        <FinancialKpiCard
          title="Saldo Total"
          value={financial.summary.balance}
          growth={calculateGrowth(
            financial.summary.balance,
            financial.summary.balance * 0.92,
          )}
          variant="balance"
        />

        <FinancialKpiCard
          title="Receitas"
          value={financial.summary.income}
          growth={calculateGrowth(
            financial.summary.income,
            financial.summary.income * 0.94,
          )}
          variant="income"
        />

        <FinancialKpiCard
          title="Despesas"
          value={financial.summary.expense}
          growth={calculateGrowth(
            financial.summary.expense,
            financial.summary.expense * 1.08,
          )}
          variant="expense"
        />

        <FinancialKpiCard
          title="Economia"
          value={financial.summary.income - financial.summary.expense}
          growth={12.8}
          variant="balance"
        />
      </div>

      {/* ================= ANALYTICS ================= */}

      {/* <div className={styles.analyticsGrid}>
        <FinancialChart data={cashflow} />

        <TopCategories categories={financial.topCategories} />
      </div> */}


      {/* ================= BOTTOM ================= */}

      <div className={styles.bottomGrid}>
        {/* <AccountsSummary accounts={cards.accounts} /> */}

        <LatestTransactions transactions={financial.latestTransactions} />

        <UpcomingBills />
      </div>
    </div>
  );
}
//   return (
//     <div className={styles.container}>
//       {/* <FinancialSummary
//         income={summary.summary.income}
//         expense={summary.summary.expense}
//         balance={summary.summary.balance}
//       /> */}

//       <AccountsSummary accounts={summary.accounts} />

//       <TopCategories categories={summary.topCategories} />

//       <LatestTransactions transactions={summary.latestTransactions} />
//     </div>
//   );
// }
