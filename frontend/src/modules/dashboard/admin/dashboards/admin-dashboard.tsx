"use client";

import styles from "./admin-dashboard.module.scss";

export function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard Administrativo</h1>

        <p>Visão geral da plataforma ECP</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>Usuários Ativos</div>

        <div className={styles.card}>Assinaturas</div>

        <div className={styles.card}>Receita Mensal</div>

        <div className={styles.card}>Inadimplência</div>
      </div>
    </div>
  );
}
