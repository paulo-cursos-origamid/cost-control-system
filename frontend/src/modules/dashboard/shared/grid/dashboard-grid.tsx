import type { ReactNode } from "react";

import styles from "./dashboard-grid.module.scss";

interface DashboardGridProps {
  children: ReactNode;
}

export function DashboardGrid({ children }: DashboardGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
