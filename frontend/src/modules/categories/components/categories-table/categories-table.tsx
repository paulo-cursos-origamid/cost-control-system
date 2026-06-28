"use client";

import { Pencil, Trash2 } from "lucide-react";

import styles from "./categories-table.module.scss";

import type { Category } from "@/modules/categories/types/category.types";

type Props = {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
};


export function CategoriesTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const columns = [
    { key: "name", label: "Nome" },
    { key: "slug", label: "Slug" },
    { key: "type", label: "Tipo" },
    { key: "color", label: "Cor" },
    {
      key: "isVehicleCategory",
      label: "Veículo",
      render: (value: boolean) => (value ? "Sim" : "Não"),
    },
  ] as const;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className={styles.empty}>
                Carregando categorias...
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className={styles.empty}>
                Nenhuma categoria encontrada.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                {columns.map((column) => {
                  const value = category[column.key as keyof Category];

                  return (
                    <td key={column.key}>
                      {column.render
                        ? column.render(value as any, category)
                        : String(value ?? "")}
                    </td>
                  );
                })}

                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => onEdit(category)}
                      title="Editar categoria"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.iconButton} ${styles.danger}`}
                      onClick={() => onDelete(category.id)}
                      title="Excluir categoria"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
