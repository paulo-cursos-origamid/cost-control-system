import { ReactNode } from "react";

import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";

import styles from "./dashboard-shell.module.scss";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
