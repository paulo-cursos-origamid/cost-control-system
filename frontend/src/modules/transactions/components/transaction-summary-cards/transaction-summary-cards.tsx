"use client";

import { useTransactionSummary } from "../../hooks/use-transaction-summary";

import styles from "./transaction-summary-cards.module.scss";

function money(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function TransactionSummaryCards() {
  const { summary } = useTransactionSummary();

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <span>Receitas</span>

        <strong className={styles.income}>{money(summary.income)}</strong>
      </div>

      <div className={styles.card}>
        <span>Despesas</span>

        <strong className={styles.expense}>{money(summary.expense)}</strong>
      </div>

      <div className={styles.card}>
        <span>Saldo</span>

        <strong
          className={summary.balance >= 0 ? styles.income : styles.expense}
        >
          {money(summary.balance)}
        </strong>
      </div>
    </div>
  );
}
