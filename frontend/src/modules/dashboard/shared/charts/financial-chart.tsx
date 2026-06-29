"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { CashflowItem } from "@/modules/dashboard/shared/types/dashboard.types";

import styles from "./financial-chart.module.scss";

type Props = {
  data: CashflowItem[];
};

function formatMonth(value: string) {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  if (!value) return "";

  const parts = value.split("-");

  // backend envia "2026-06"
  if (parts.length === 2) {
    const month = Number(parts[1]);
    return months[month - 1] ?? value;
  }

  // fallback caso venha apenas "06"
  const month = Number(value);
  return months[month - 1] ?? value;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>

      {payload.map((entry: any) => (
        <p key={entry.dataKey} className={styles.item}>
          <span style={{ color: entry.color }}>●</span>{" "}
          {entry.name}: R$ {Number(entry.value).toLocaleString("pt-BR")}
        </p>
      ))}
    </div>
  );
}

export function FinancialChart({ data }: Props) {
    console.log("FinancialChart data:", data);
  const chartData = (data ?? []).map((item) => ({
    ...item,
    saldo: item.income - item.expense,
  }));

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>

          {/* GRID */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 4"
            vertical={false}
          />

          {/* 📅 X AXIS (MESES FORMATADOS) */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={formatMonth}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* 🔥 LEGEND CORRIGIDA */}
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: 10,
              color: "#94a3b8",
              fontSize: 12,
            }}
          />

          {/* GRADIENTES */}
          <defs>
            <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="saldoColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* LINHAS */}
          <Area
            type="monotone"
            dataKey="income"
            name="Receitas"
            stroke="#22c55e"
            fill="url(#incomeColor)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="expense"
            name="Despesas"
            stroke="#ef4444"
            fill="url(#expenseColor)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="saldo"
            name="Saldo"
            stroke="#3b82f6"
            fill="url(#saldoColor)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}