"use client";

import { useEffect, useState } from "react";

import { transactionsService } from "../services/transactions.service";

type Summary = {
  income: number;
  expense: number;
  balance: number;
};

export function useTransactionSummary() {
  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await transactionsService.getSummary();

        setSummary(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return {
    summary,
    loading,
  };
}
