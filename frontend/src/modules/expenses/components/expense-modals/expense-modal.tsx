"use client";

import { CrudModal } from "@/components/shared/crud/CrudModal";

import { ExpenseForm } from "../../forms/expense-form";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   initialData?: Partial<ExpenseFormData>;
//   onSubmit: (data: ExpenseFormData) => Promise<void>;
// }
type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function ExpenseModal({ open, onClose, initialData, onSubmit }: Props) {
  return (
    <CrudModal open={open} onClose={onClose} title="Despesa">
      <ExpenseForm initialData={initialData} onSubmit={onSubmit} />
    </CrudModal>
  );
}
