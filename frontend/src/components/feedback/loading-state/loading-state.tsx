import { LoaderCircle } from "lucide-react";

import styles from "./loading-state.module.scss";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Carregando informações...",
}: LoadingStateProps) {
  return (
    <div className={styles.loading}>
      <LoaderCircle className={styles.spinner} />

      <p>{message}</p>
    </div>
  );
}