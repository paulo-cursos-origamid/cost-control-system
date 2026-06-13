"use client";

import { FormEvent, useState } from "react";

import { apiFetch } from "@/lib/api/fetcher";

import { CrudField, CrudFormData, CrudFormSchema } from "./types";

import styles from "./generic-form.module.scss";

type Props = {
  schema: CrudFormSchema;
  initialData?: CrudFormData;
  onSuccess?: () => void;
};

export function GenericForm({ schema, initialData, onSuccess }: Props) {
  const [form, setForm] = useState<CrudFormData>(initialData ?? {});

  const [loading, setLoading] = useState(false);

  function handleChange(name: string, value: string | number | boolean) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = Object.fromEntries(
        schema.fields.map((field) => [field.name, form[field.name]]),
      );

      const isEditing = Boolean(initialData?.id);

      const endpoint = isEditing
        ? `${schema.endpoint}/${initialData?.id}`
        : schema.endpoint;

      const method = isEditing ? "PATCH" : "POST";

      await apiFetch(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fields}>
        {schema.fields.map((field: CrudField) => (
          <div key={field.name} className={styles.field}>
            <label className={styles.label}>{field.label}</label>

            {field.type === "select" ? (
              <select
                className={styles.select}
                value={String(form[field.name] ?? "")}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Selecione</option>

                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={styles.input}
                type={field.type}
                placeholder={field.placeholder}
                value={String(form[field.name] ?? "")}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton}>
          Cancelar
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? "Salvando..."
            : initialData?.id
              ? "Atualizar"
              : "Criar Usuário"}
        </button>
      </div>
    </form>
  );
}
