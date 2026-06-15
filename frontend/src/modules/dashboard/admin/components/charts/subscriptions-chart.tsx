"use client";

import styles from "./default-chart.module.scss";

export function SubscriptionsChart() {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.title}>
        Assinaturas por Plano
      </h3>

      <div className={styles.placeholder}>
        Gráfico de Planos
      </div>
    </div>
  );
}