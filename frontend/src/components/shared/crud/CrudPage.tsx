"use client";

import { useState } from "react";

import { CrudModal } from "./CrudModal";

import { CrudSchema } from "./types";
import { CrudTable } from "./CrudTable";
import styles from "./crud-page.module.scss";
import { Plus } from "lucide-react";

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
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          {schema.title}
        </h1>

        <p className={styles.subtitle}>
          Gerencie os registros cadastrados
        </p>
      </div>

      <button
        className={styles.createButton}
        onClick={handleCreate}
      >
        <Plus size={18} />

        Criar {schema.title}
      </button>
    </div>

    <div className={styles.content}>
      <CrudTable
        data={data}
        columns={schema.columns}
        onEdit={(item) => handleEdit(item as T)}
        onDelete={onDelete}
      />
    </div>

    <CrudModal
      open={open}
      title={
        editing
          ? `Editar ${schema.title}`
          : `Criar ${schema.title}`
      }
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
  </div>
);
}
