"use client";

import styles from "./expense-summary-cards.module.scss";

import { useExpenseSummary } from "../../hooks/use-expense-sumary";

export function ExpenseSummaryCards() {
  const { summary, loading } = useExpenseSummary();

  if (loading) {
    return <div className={styles.loading}>Carregando cards...</div>;
  }

  const { total, income, balance } = summary;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>Total de Despesas</span>
        <h2 className={styles.value}>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Receita Total</span>
        <h2 className={styles.value}>
          {income.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Saldo Atual</span>
        <h2
          className={`${styles.value} ${
            balance < 0 ? styles.negative : styles.positive
          }`}
        >
          {balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </div>
    </div>
  );
}