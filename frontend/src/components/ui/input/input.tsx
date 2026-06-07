import { InputHTMLAttributes } from 'react';

import styles from './input.module.scss';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

  error?: string;
}

export function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
      </label>

      <input
        className={styles.input}
        {...props}
      />

      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}

