"use client";

import { Modal } from "@/components/modal/modal";
import { GenericForm } from "../forms/generic-form/GenericForm";
import { CrudFormData } from "../forms/generic-form/types";
import { CrudSchema } from "./types";
import styles from "./crud-modal.module.scss";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  schema?: CrudSchema;
  initialData?: CrudFormData;
  onClose: () => void;
  onSuccess?: () => void;
  children?: ReactNode;
};

export function CrudModal({
  open,
  title,
  schema,
  initialData,
  onClose,
  onSuccess,
  children,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          {schema ? (
            <GenericForm
              schema={schema}
              initialData={initialData}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          ) : (
            children
          )}
        </div>
      </div>
    </Modal>
  );
}