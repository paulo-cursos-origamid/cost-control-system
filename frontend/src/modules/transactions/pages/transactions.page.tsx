"use client";

import { useMemo, useState } from "react";

import { TransactionFilters } from "../components/transaction-filters";
import { TransactionSummaryCards } from "../components/transaction-summary-cards/transaction-summary-cards";
import { TransactionTable } from "../components/transaction-table/transaction-table";
import { useTransactions } from "../hooks/use-transactions";

export function TransactionsPage() {
  const { data, loading, refetch } = useTransactions();

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((tx) =>
      tx.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <TransactionSummaryCards />

      <TransactionFilters search={search} onSearchChange={setSearch} />

      <TransactionTable data={filteredData} onRefresh={refetch} />
    </>
  );
}
