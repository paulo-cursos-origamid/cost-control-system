import type { ReactNode } from "react";

import styles from "./dashboard-section.module.scss";

interface DashboardSectionProps {
  title: string;
  children: ReactNode;
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>

      {children}
    </section>
  );
}
