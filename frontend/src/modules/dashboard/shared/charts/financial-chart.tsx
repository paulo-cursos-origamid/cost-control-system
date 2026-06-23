"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Bar,
  Line,
} from "recharts";

import type { CashflowItem } from "@/modules/dashboard/shared/types/dashboard.types";

import styles from "./financial-chart.module.scss";

interface FinancialChartProps {
  data: CashflowItem[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipName}>{entry.name}</span>
          <span className={styles.tooltipValue}>
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FinancialChart({ data }: FinancialChartProps) {
  const [period, setPeriod] = useState("Mensal");

  const enhancedData = data.map((item) => ({
    ...item,
    saldo: item.income - item.expense,
  }));

  const monthlyData = enhancedData;

  return (
    <section className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.chartHeader}>
          <div className={styles.chartLabel}>Período</div>
          <div className={styles.periodControls}>
            <button
              type="button"
              className={period === "Mensal" ? styles.periodButtonActive : styles.periodButton}
              onClick={() => setPeriod("Mensal")}
            >
              Mensal
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={392}>
          <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />

            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: 8, color: "rgba(255,255,255,0.75)" }}
              formatter={(value) => <span>{value}</span>}
            />

            <Bar dataKey="income" name="Receitas" fill="#22c55e" radius={[8, 8, 0, 0]} barSize={24} />
            <Bar dataKey="expense" name="Despesas" fill="#ef4444" radius={[8, 8, 0, 0]} barSize={24} />
            <Line
              type="monotone"
              dataKey="saldo"
              name="Saldo"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#ffffff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
