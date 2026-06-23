"use client";

import { useMemo } from "react";

import { useTransactions } from "@/modules/transactions/hooks/use-transactions";
import { TransactionType } from "@/modules/transactions/types/transaction.types";

export function useExpenses() {
  const { data, loading, refetch } = useTransactions();

  const expenses = useMemo(() => {
    return data.filter((t) => t.type === "EXPENSE");
  }, [data]);

  const total = useMemo(() => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  }, [expenses]);

  return {
    data: expenses,
    loading,
    refetch,
    total,
  };
}