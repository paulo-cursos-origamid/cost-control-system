import type { ReactNode } from "react";

import styles from "./data-table.module.scss";

export interface DataTableColumn<T extends Record<string, unknown>> {
  key: keyof T;
  label: string;

  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
}: DataTableProps<T>) {
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (data.length === 0) {
    return <p>Nenhum registro encontrado.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => {
              const value = row[column.key];

              return (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(value, row)
                    : String(value ?? "-")}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
