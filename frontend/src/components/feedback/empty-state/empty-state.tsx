import { Inbox } from "lucide-react";

import styles from "./empty-state.module.scss";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <Inbox size={48} />

      <h3>{title}</h3>

      {description && <p>{description}</p>}
    </div>
  );
}