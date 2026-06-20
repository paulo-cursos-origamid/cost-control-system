"use client";

import styles from "./financial-kpi-card.module.scss";

type Props = {
  title: string;
  value: number;
  variant: "income" | "expense" | "balance";
};

export function FinancialKpiCard({
  title,
  value,
  variant,
}: Props) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <span>{title}</span>

      <strong>
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </strong>
    </div>
  );
}