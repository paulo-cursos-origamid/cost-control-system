"use client";

import type { ReactNode } from "react";

import styles from "./stat-card.module.scss";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;

  variant?:
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
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant,
}: StatCardProps) {
  return (
    <div
      className={`${styles.card} ${
        variant ? styles[variant] : ""
      }`}
    >
      <div className={styles.header}>
        <span className={styles.title}>
          {title}
        </span>

        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
      </div>

      <div className={styles.value}>
        {value}
      </div>

      {subtitle && (
        <div className={styles.subtitle}>
          {subtitle}
        </div>
      )}
    </div>
  );
}