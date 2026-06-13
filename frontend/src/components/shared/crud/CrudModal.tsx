"use client";

import { Modal } from "@/components/modal/modal";

import { GenericForm } from "../forms/generic-form/GenericForm";

import { CrudFormData } from "../forms/generic-form/types";
import { CrudSchema } from "./types";

type Props = {
  open: boolean;

  title: string;

  schema: CrudSchema;

  initialData?: CrudFormData;

  onClose: () => void;

  onSuccess?: () => void;
};

export function CrudModal({
  open,
  title,
  schema,
  initialData,
  onClose,
  onSuccess,
}: Props) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <GenericForm
        schema={schema}
        initialData={initialData}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
