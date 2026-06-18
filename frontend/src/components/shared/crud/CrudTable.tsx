"use client";

import styles from "./crud-table.module.scss";
import { Pencil, Trash2 } from "lucide-react";

export type CrudColumn = {
  key: string;
  label: string;
  render?: (value: unknown, row: Entity) => React.ReactNode;
};

export type Entity = {
  id: string;
} & Record<string, unknown>;

type Props = {
  data: Entity[];
  columns: CrudColumn[];
  onEdit: (item: Entity) => void;
  onDelete: (id: string) => void | Promise<void>;
};

export function CrudTable({ data, columns, onEdit, onDelete }: Props) {
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
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] ?? "")}
                </td>
              ))}

              <td>
                <div className={styles.actions}>
                  <button
                    type="button"
                    title="Editar"
                    className={styles.editButton}
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    title="Excluir"
                    className={styles.deleteButton}
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
