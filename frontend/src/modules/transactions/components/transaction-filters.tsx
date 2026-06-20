"use client";

import styles from "./transaction-filters.module.scss";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function TransactionFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Buscar transações..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

      <select>
        <option value="">Todos os tipos</option>
        <option value="INCOME">Receita</option>
        <option value="EXPENSE">Despesa</option>
        <option value="TRANSFER">Transferência</option>
      </select>
    </div>
  );
}