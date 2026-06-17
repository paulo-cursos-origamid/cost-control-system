import type { ReactNode } from "react";

import styles from "./data-table.module.scss";
import { EmptyState } from "@/components/feedback/empty-state/empty-state";
import { LoadingState } from "@/components/feedback/loading-state/loading-state";

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
  // if (loading) {
  //   return <p>Carregando...</p>;
  // }
if (loading) {
  return (
    <LoadingState message="Carregando transações..." />
  );
}
  // if (data.length === 0) {
  //   return <p>Nenhum registro encontrado.</p>;
  // }
  if (!data.length) {
    return (
      <EmptyState
        title="Nenhum registro encontrado"
        description="Não existem informações para exibir."
      />
    );
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
