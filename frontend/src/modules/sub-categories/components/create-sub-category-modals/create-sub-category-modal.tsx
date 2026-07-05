"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { Modal } from "@/components/modal/modal";
import { useCategories } from "@/modules/categories/hooks/use-categories";

import { subCategoryService } from "../../services/sub-category.service";

import styles from "./create-sub-category-modal.module.scss";

type Props = {
  open: boolean;
  categoryId?: string;
  onClose: () => void;
  onSaved: () => void;
};

export function CreateSubCategoryModal({
  open,
  categoryId: initialCategoryId,
  onClose,
  onSaved,
}: Props) {
  const { categories } = useCategories();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [categoryId, setCategoryId] = useState(initialCategoryId ?? "");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await subCategoryService.create({
        name,
        slug,
        categoryId,
      });

      setName("");
      setSlug("");
      setCategoryId("");

      onSaved();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar subcategoria.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
  if (open) {
    setCategoryId(initialCategoryId ?? "");
  }
}, [open, initialCategoryId]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Criar subcategoria</h2>

            <p className={styles.subtitle}>
              Cadastre uma nova subcategoria vinculada a uma categoria.
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
            <label className={styles.label} htmlFor="subcategory-name">
              Nome
            </label>

            <input
              id="subcategory-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="subcategory-slug">
              Slug
            </label>

            <input
              id="subcategory-slug"
              className={styles.input}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="subcategory-category">
              Categoria
            </label>

            <select
              id="subcategory-category"
              className={styles.select}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
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

          {error && <div className={styles.error}>{error}</div>}

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
              {loading ? "Salvando..." : "Criar subcategoria"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
