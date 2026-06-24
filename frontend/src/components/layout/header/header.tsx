"use client";

import { LogOut, UserCircle2, ShieldCheck } from "lucide-react";

import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useLogout } from "@/modules/auth/hooks/use-logout";

import { ThemeSwitch } from "@/components/ui/themes-switch/ theme-switch";

import styles from "./header.module.scss";

export function Header() {
  const { user } = useAuth();
  const { signOut } = useLogout();

  return (
    <header className={styles.header}>
      {/* USER INFO */}
      <div className={styles.user}>
        <div className={styles.avatar}>
          <UserCircle2 size={34} />
        </div>

        <div className={styles.userInfo}>
          <span className={styles.name}>{user?.name}</span>

          <span className={styles.role}>
            <ShieldCheck size={14} />
            {user?.role}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <ThemeSwitch />

        <button className={styles.logout} onClick={signOut}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
