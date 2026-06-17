"use client";

import styles from "./financial-summary.module.scss";

interface Props {
  income: number;
  expense: number;
  balance: number;
}

export function FinancialSummary({ income, expense, balance }: Props) {
  return (
    <div className={styles.card}>
      <h3>Resumo Financeiro</h3>

      <div className={styles.items}>
        <div>
          <span>Receitas</span>
          <strong>R$ {income.toLocaleString("pt-BR")}</strong>
        </div>

        <div>
          <span>Despesas</span>
          <strong>R$ {expense.toLocaleString("pt-BR")}</strong>
        </div>

        <div>
          <span>Saldo</span>
          <strong>R$ {balance.toLocaleString("pt-BR")}</strong>
        </div>
      </div>
    </div>
  );
}
