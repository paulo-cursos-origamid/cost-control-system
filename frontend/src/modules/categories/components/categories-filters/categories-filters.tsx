"use client";

import styles from "./categories-filters.module.scss";

type Props = {
  search: string;
  type: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export function CategoriesFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
}: Props) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Buscar categorias..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

      <select
        value={type}
        onChange={(e) =>
          onTypeChange(e.target.value)
        }
      >
        <option value="">Todos os tipos</option>
        <option value="INCOME">Receita</option>
        <option value="EXPENSE">Despesa</option>
      </select>
    </div>
  );
}