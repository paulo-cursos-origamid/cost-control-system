"use client";

import { useCallback, useEffect, useState } from "react";

import { transactionsService } from "../services/transactions.service";
import { Transaction } from "../types/transaction.types";

export function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const transactions = await transactionsService.getAll();

      console.log(transactions);
      console.log(Array.isArray(transactions));

      setData(transactions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  return {
    data,
    loading,
    refetch: fetchTransactions,
  };
}
