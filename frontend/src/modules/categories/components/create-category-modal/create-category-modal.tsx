"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/modal/modal";
import { categoryService } from "@/modules/categories/services/category.service";
import type { Category } from "@/modules/categories/types/category.types";

import styles from "./create-category-modal.module.scss";

type FormState = {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
  isVehicleCategory: boolean;
};

type Props = {
  open: boolean;
  initialData?: Category;
  onClose: () => void;
  onSaved: () => void;
};

const initialFormState: FormState = {
  name: "",
  slug: "",
  description: "",
  color: "#2563eb",
  icon: "",
  type: "EXPENSE",
  isVehicleCategory: false,
};

export function CreateCategoryModal({
  open,
  initialData,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<FormState>(
    initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          description: initialData.description ?? "",
          color: initialData.color ?? "#2563eb",
          icon: initialData.icon ?? "",
          type: initialData.type,
          isVehicleCategory: initialData.isVehicleCategory,
        }
      : initialFormState,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(name: keyof FormState, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || undefined,
        color: form.color,
        icon: form.icon || undefined,
        type: form.type,
        isVehicleCategory: form.isVehicleCategory,
      };

      if (initialData) {
        await categoryService.update(initialData.id, payload);
      } else {
        await categoryService.create(payload);
      }

      onSaved();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao salvar categoria. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              {initialData ? "Editar categoria" : "Criar categoria"}
            </h2>
            <p className={styles.subtitle}>
              {initialData
                ? "Atualize os dados da categoria."
                : "Cadastre uma nova categoria para receitas ou despesas."}
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="category-name">
              Nome
            </label>
            <input
              id="category-name"
              className={styles.input}
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="category-slug">
              Slug
            </label>
            <input
              id="category-slug"
              className={styles.input}
              type="text"
              value={form.slug}
              onChange={(event) => handleChange("slug", event.target.value)}
              required
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="category-type">
                Tipo
              </label>
              <select
                id="category-type"
                className={styles.select}
                value={form.type}
                onChange={(event) =>
                  handleChange("type", event.target.value as FormState["type"])
                }
              >
                <option value="EXPENSE">Despesa</option>
                <option value="INCOME">Receita</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="category-color">
                Cor
              </label>
              <input
                id="category-color"
                className={styles.input}
                type="color"
                value={form.color}
                onChange={(event) => handleChange("color", event.target.value)}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="category-description">
              Descrição
            </label>
            <textarea
              id="category-description"
              className={styles.textarea}
              value={form.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              rows={3}
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="category-icon">
                Ícone
              </label>
              <input
                id="category-icon"
                className={styles.input}
                type="text"
                value={form.icon}
                onChange={(event) => handleChange("icon", event.target.value)}
                placeholder="Ex.: wallet"
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.isVehicleCategory}
                  onChange={(event) =>
                    handleChange("isVehicleCategory", event.target.checked)
                  }
                />
                Categoria de veículo
              </label>
            </div>
          </div>

          {error ? <div className={styles.error}>{error}</div> : null}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Criar categoria"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
