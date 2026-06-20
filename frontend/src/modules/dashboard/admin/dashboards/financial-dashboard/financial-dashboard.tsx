"use client";

import { FinancialSummary } from "../../components/financial-summary/financial-summary";

import { useDashboard } from "@/modules/dashboard/hooks/use-dashboard";

import styles from "./financial-dashboard.module.scss";
import { AccountsSummary } from "../../components/accounts-summary/accounts-summary";
import { TopCategories } from "../../components/top-categories/top-categories";
import { LatestTransactions } from "../../components/latest-transactions/latest-transactions";

export function FinancialDashboard() {
  const { summary, loading } = useDashboard();

  if (loading || !summary) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <FinancialSummary
        income={summary.summary.income}
        expense={summary.summary.expense}
        balance={summary.summary.balance}
      />

      <AccountsSummary accounts={summary.accounts} />

      <TopCategories categories={summary.topCategories} />

      <LatestTransactions transactions={summary.latestTransactions} />
    </div>
  );
}
