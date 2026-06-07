import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  children,
  loading,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={styles.button} disabled={loading} {...props}>
      {loading ? "Entrando..." : children}
    </button>
  );
}
