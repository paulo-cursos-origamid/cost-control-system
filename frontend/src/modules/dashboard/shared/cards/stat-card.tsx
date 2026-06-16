"use client";

import type { ReactNode } from "react";

import styles from "./stat-card.module.scss";

export type StatCardVariant =
  | "users"
  | "premium"
  | "gold"
  | "lifetime"
  | "paid"
  | "late"
  | "mrr"
  | "arr"
  | "new"
  | "cancelled";

interface StatCardProps {
  title: string;
  value: string | number;

  icon?: ReactNode;

  subtitle?: string;

  variant?: StatCardVariant;
}

export function StatCard({
  title,
  value,
  icon,
  subtitle,
  variant,
}: StatCardProps) {
  return (
    <div className={`${styles.card} ${variant ? styles[variant] : ""}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        {icon && <div className={styles.icon}>{icon}</div>}
      </div>

      <div className={styles.value}>{value}</div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}
