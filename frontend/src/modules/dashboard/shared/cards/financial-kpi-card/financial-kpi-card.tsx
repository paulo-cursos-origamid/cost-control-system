"use client";

import { ArrowDown, ArrowUp, Wallet } from "lucide-react";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

import styles from "./financial-kpi-card.module.scss";

type Variant = "income" | "expense" | "balance";

type Props = {
  title: string;
  value: number;
  variant: Variant;
  growth?: number;
};

const chartData = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 45 },
  { value: 40 },
  { value: 58 },
  { value: 52 },
  { value: 72 },
];

const variants = {
  income: {
    icon: ArrowDown,
    color: "#00d084",
  },

  expense: {
    icon: ArrowUp,
    color: "#ff4d4f",
  },

  balance: {
    icon: Wallet,
    color: "#3b82f6",
  },
};

export function FinancialKpiCard({
  title,
  value,
  variant,
  growth,
}: Props) {
  const config = variants[variant];
  const Icon = config.icon;
  const growthValue = growth ?? 0;

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <header className={styles.header}>
        <h3>{title}</h3>

        <div className={styles.iconWrapper}>
          <Icon size={20} />
        </div>
      </header>

      <strong className={styles.value}>
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </strong>

      <div className={styles.footer}>
        <span
          className={`${styles.growth} ${
            growthValue >= 0 ? styles.positive : styles.negative
          }`}
        >
          {growthValue >= 0 ? "+" : ""}
          {growthValue.toFixed(1)}%
        </span>

        <small>vs. período anterior</small>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.color}
              fill="transparent"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
