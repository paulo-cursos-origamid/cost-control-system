"use client";

export type CrudColumn = {
  key: string;
  label: string;
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
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}

          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {(Array.isArray(data) ? data : []).map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>{String(item[column.key] ?? "")}</td>
            ))}

            <td>
              <button onClick={() => onEdit(item)}>Editar</button>

              <button onClick={() => onDelete(item.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
