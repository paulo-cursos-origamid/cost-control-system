"use client";

import { useState } from "react";

import styles from "./expense-form.module.scss";

import { ExpenseFormData } from "../types/expense.types";

type Props = {
  initialData?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
};

export function ExpenseForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<ExpenseFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    date: initialData?.date || "",
    accountId: initialData?.accountId || "",
    categoryId: initialData?.categoryId || "",
    creditCardId: initialData?.creditCardId,
    type: "EXPENSE",
  });

  function handleChange<K extends keyof ExpenseFormData>(
    field: K,
    value: ExpenseFormData[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Título</label>
        <input
          className={styles.input}
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Descrição</label>
        <textarea
          className={styles.textarea}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Valor</label>
          <input
            type="number"
            className={styles.input}
            value={form.amount}
            onChange={(e) => handleChange("amount", Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Data</label>
          <input
            type="date"
            className={styles.input}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
