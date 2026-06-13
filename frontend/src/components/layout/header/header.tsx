"use client";

import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useLogout } from "@/modules/auth/hooks/use-logout";

import styles from "./header.module.scss";

export function Header() {
  const { user } = useAuth();

  const { signOut } = useLogout();

  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <span className={styles.name}>
          {user?.name}
        </span>

        <span className={styles.role}>
          {user?.role}
        </span>
      </div>

      <button
        className={styles.logout}
        onClick={signOut}
      >
        Sair
      </button>
    </header>
  );
}