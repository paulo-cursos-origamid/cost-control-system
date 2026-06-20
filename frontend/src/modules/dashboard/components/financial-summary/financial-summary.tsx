"use client";

import styles from "./financial-summary.module.scss";

type Props = {
  income: number;
  expense: number;
  balance: number;
};

function currency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function FinancialSummary({ income, expense, balance }: Props) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span>Receitas</span>
        <strong>{currency(income)}</strong>
      </div>

      <div className={styles.card}>
        <span>Despesas</span>
        <strong>{currency(expense)}</strong>
      </div>

      <div className={styles.card}>
        <span>Saldo</span>
        <strong>{currency(balance)}</strong>
      </div>
    </div>
  );
}
