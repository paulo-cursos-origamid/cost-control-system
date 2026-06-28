"use client";

import { CrudModal } from "@/components/shared/crud/CrudModal";
import { ExpenseForm } from "../../forms/expense-form";
import { Expense } from "../../types/expense.types";
import { ExpenseFormData } from "../../schemas/expense.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Expense;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
};

export function ExpenseModal({ open, onClose, initialData, onSubmit }: Props) {
  return (
    <CrudModal open={open} onClose={onClose} title="Despesa">
      <ExpenseForm initialData={initialData} onSubmit={onSubmit} />
    </CrudModal>
  );
}
