"use client";

import { useEffect, useState } from "react";
import { transactionsService, Transaction } from "../services/transactions.service";

export function useTransactions(params?: { page?: number; limit?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);

  async function fetchTransactions() {
    try {
      setLoading(true);

      const response = await transactionsService.list(params);

      setTransactions(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [params?.page, params?.limit]);

  return {
    transactions,
    meta,
    loading,
    refetch: fetchTransactions,
  };
}