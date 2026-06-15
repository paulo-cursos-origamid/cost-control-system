"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Shield,
  Receipt,
  Wallet,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

import styles from "./dashboard.module.scss";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response =
          await apiFetch<ApiResponse<User[]>>(
            "/api/users",
          );

        setUsers(response.data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "ADMIN",
  ).length;

  const totalTransactions = 0;

  const totalBalance = 0;

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>
            Dashboard
          </h1>

          <p className={styles.dashboardSubtitle}>
            Visão geral do sistema ECP
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div
          className={`${styles.statCard} ${styles.cardUsers}`}
        >
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>
              Usuários
            </span>

            <div className={styles.statIcon}>
              <Users size={22} />
            </div>
          </div>

          <div className={styles.statValue}>
            {totalUsers}
          </div>

          <div className={styles.statFooter}>
            usuários cadastrados
          </div>
        </div>

        <div
          className={`${styles.statCard} ${styles.cardAdmins}`}
        >
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>
              Administradores
            </span>

            <div className={styles.statIcon}>
              <Shield size={22} />
            </div>
          </div>

          <div className={styles.statValue}>
            {totalAdmins}
          </div>

          <div className={styles.statFooter}>
            acessos privilegiados
          </div>
        </div>

        <div
          className={`${styles.statCard} ${styles.cardTransactions}`}
        >
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>
              Transações
            </span>

            <div className={styles.statIcon}>
              <Receipt size={22} />
            </div>
          </div>

          <div className={styles.statValue}>
            {totalTransactions}
          </div>

          <div className={styles.statFooter}>
            movimentações registradas
          </div>
        </div>

        <div
          className={`${styles.statCard} ${styles.cardBalance}`}
        >
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>
              Saldo Geral
            </span>

            <div className={styles.statIcon}>
              <Wallet size={22} />
            </div>
          </div>

          <div className={styles.statValue}>
            R$ {totalBalance.toFixed(2)}
          </div>

          <div className={styles.statFooter}>
            patrimônio consolidado
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Últimos usuários
        </h3>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className={styles.userList}>
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className={styles.userItem}
              >
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    {user.name}
                  </span>

                  <span className={styles.userEmail}>
                    {user.email}
                  </span>
                </div>

                <span
                  className={`${styles.role} ${
                    styles[user.role.toLowerCase()]
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}