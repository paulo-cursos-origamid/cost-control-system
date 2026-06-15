"use client";

import styles from "./default-chart.module.scss";

export function UsersGrowthChart() {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.title}>
        Crescimento de Usuários
      </h3>

      <div className={styles.placeholder}>
        Gráfico de Crescimento
      </div>
    </div>
  );
}