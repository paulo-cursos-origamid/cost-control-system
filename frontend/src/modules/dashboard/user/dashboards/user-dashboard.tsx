"use client";

import styles from "./user-dashboard.module.scss";

export function UserDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Meu Dashboard</h1>

        <p>Resumo financeiro pessoal</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>Saldo Atual</div>

        <div className={styles.card}>Receitas</div>

        <div className={styles.card}>Despesas</div>

        <div className={styles.card}>Veículos</div>
      </div>
    </div>
  );
}
