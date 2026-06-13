"use client";

import { useState } from "react";

import { CrudModal } from "./CrudModal";

import { CrudSchema } from "./types";
import { CrudTable } from "./CrudTable";


type BaseEntity = {
  id: string;
};

type CrudPageProps<T extends BaseEntity> = {
  schema: CrudSchema;

  data: T[];

  onDelete: (id: string) => Promise<void>;

  onRefresh: () => Promise<void>;
};

export function CrudPage<T extends BaseEntity>({
  schema,
  data,
  onDelete,
  onRefresh,
}: CrudPageProps<T>) {
  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState<T | null>(null);

  function handleCreate() {
    setEditing(null);
    setOpen(true);
  }

  function handleEdit(item: T) {
    setEditing(item);
    setOpen(true);
  }

  async function handleSuccess() {
    await onRefresh();
    setOpen(false);
  }

  return (
    <>
      <button onClick={handleCreate}>+ Criar {schema.title}</button>

      <CrudTable
        data={data}
        columns={schema.columns}
        onEdit={(item) => handleEdit(item as T)}
        onDelete={onDelete}
      />

      <CrudModal
        open={open}
        title={editing ? `Editar ${schema.title}` : `Criar ${schema.title}`}
        schema={schema}
        initialData={
          editing as Record<
            string,
            string | number | boolean | null | undefined
          >
        }
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
