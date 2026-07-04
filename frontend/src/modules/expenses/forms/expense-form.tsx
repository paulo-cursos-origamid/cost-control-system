"use client";

import { useEffect, useState } from "react";

import styles from "./expense-form.module.scss";

import { useAccounts } from "@/modules/accounts/hooks/use-accounts";
import { useCategories } from "@/modules/categories/hooks/use-categories";
import { useSubCategories } from "@/modules/sub-categories/hooks/use-sub-categories";

import { ExpenseFormData } from "../types/expense.types";

type Props = {
  initialData?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  onCancel?: () => void;
};

export function ExpenseForm({ initialData, onSubmit, onCancel }: Props) {
  const { data: accounts = [] } = useAccounts();

  const { categories = [] } = useCategories();

  const [form, setForm] = useState<ExpenseFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    amount: initialData?.amount ?? 0,
    date: initialData?.date ?? "",

    type: "EXPENSE",

    accountId: initialData?.accountId ?? "",

    categoryId: initialData?.categoryId ?? "",

    subCategoryId: initialData?.subCategoryId ?? "",

    creditCardId: initialData?.creditCardId,
  });

  const { data: subCategories = [] } = useSubCategories(form.categoryId);

  useEffect(() => {
    console.log("Categoria atual:", form.categoryId);

    console.log("Subcategorias carregadas:", subCategories);
  }, [form.categoryId, subCategories]);

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

    await onSubmit({
      ...form,
      type: "EXPENSE",
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Título</label>

        <input
          className={styles.input}
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
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
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Data</label>

          <input
            type="date"
            className={styles.input}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Conta</label>

          <select
            className={styles.select}
            value={form.accountId}
            onChange={(e) => handleChange("accountId", e.target.value)}
            required
          >
            <option value="">Selecione uma conta</option>

            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Categoria</label>

          <select
            className={styles.select}
            value={form.categoryId}
            onChange={(e) => {
              const categoryId = e.target.value;

              setForm((prev) => ({
                ...prev,
                categoryId,
                subCategoryId: "",
              }));
            }}
            required
          >
            <option value="">Selecione uma categoria</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Subcategoria</label>

        <select
          className={styles.select}
          value={form.subCategoryId ?? ""}
          onChange={(e) => handleChange("subCategoryId", e.target.value)}
          disabled={!form.categoryId}
        >
          <option value="">Selecione uma subcategoria</option>

          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button type="submit" className={styles.submitButton}>
          Salvar
        </button>
      </div>
    </form>
  );
}
