import styles from "./dashboard-card.module.scss";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant:
    | "users"
    | "premium"
    | "gold"
    | "lifetime"
    | "paid"
    | "late"
    | "mrr"
    | "arr"
    | "new"
    | "cancelled";
}

export function DashboardCard({
  title,
  value,
  icon,
  variant,
}: DashboardCardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]}`}
    >
      <div className={styles.header}>
        <span>{title}</span>

        <div className={styles.icon}>
          {icon}
        </div>
      </div>

      <div className={styles.value}>
        {value}
      </div>
    </div>
  );
}