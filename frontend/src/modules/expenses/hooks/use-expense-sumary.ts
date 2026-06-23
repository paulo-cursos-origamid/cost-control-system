"use client";

import { useMemo } from "react";

import { useTransactionSummary } from "@/modules/transactions/hooks/use-transaction-summary";

export function useExpenseSummary() {
  const { summary, loading } = useTransactionSummary();

  const expenseSummary = useMemo(() => {
    return {
      total: summary.expense,
      income: summary.income,
      balance: summary.balance,
    };
  }, [summary]);

  return {
    summary: expenseSummary,
    loading,
  };
}