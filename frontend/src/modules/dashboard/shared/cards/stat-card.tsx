"use client";

import type { ReactNode } from "react";

import styles from "./stat-card.module.scss";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
}

export function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        {icon && <div className={styles.icon}>{icon}</div>}
      </div>

      <div className={styles.value}>{value}</div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}
