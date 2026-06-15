"use client";

import styles from "./default-chart.module.scss";

export function RevenueChart() {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.title}>
        Receita Mensal
      </h3>

      <div className={styles.placeholder}>
        Gráfico de Receita
      </div>
    </div>
  );
}