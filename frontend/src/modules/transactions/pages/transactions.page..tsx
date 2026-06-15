"use client";

import { useTransactions } from "../hooks/use-transactions";

export function TransactionsPage() {
  const { transactions, loading } = useTransactions();

  return (
    <div>
      <h1>Transações</h1>

      {/* botão nova transação */}

      {/* tabela */}
    </div>
  );
}
