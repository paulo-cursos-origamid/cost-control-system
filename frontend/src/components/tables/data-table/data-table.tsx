import styles from "./data-table.module.scss";

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
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

  if (!data.length) {
    return <p>Nenhum registro encontrado.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)?? "-"}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={String(column.key)}>
                {String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}