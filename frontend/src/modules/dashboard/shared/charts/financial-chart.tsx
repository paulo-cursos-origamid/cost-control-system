"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import type { CashflowItem } from "@/modules/dashboard/shared/types/dashboard.types";

import styles from "./financial-chart.module.scss";

interface FinancialChartProps {
  data: CashflowItem[];
}

export function FinancialChart({ data }: FinancialChartProps) {
  return (
    <section className={styles.container}>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="income" name="Receitas" />

            <Bar dataKey="expense" name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
