"use client";

import { useLogout } from "@/modules/auth/hooks/use-logout";

import { useAuth } from "@/modules/auth/hooks/use-auth";

import styles from "./header.module.scss";

export function Header() {
  const { signOut } = useLogout();

  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div>
        <strong>{user?.name}</strong>

        <span>{user?.role}</span>
      </div>

      <button onClick={signOut}>Sair</button>
    </header>
  );
}
