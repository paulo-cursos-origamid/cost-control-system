"use client";

import { useState } from "react";

import { ExpenseSummaryCards } from "../components/expense-summary-cards/expense-summary-cards";
import { ExpenseTable } from "../components/expense-table/expense-table";
import { ExpenseModal } from "../components/expense-modals/expense-modal";

import { useExpenses } from "../hooks/use-expenses";
import { expensesService } from "../services/expenses.service";

export function ExpensesPage() {
  const { refetch } = useExpenses();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  async function handleSubmit(data: any) {
    if (editing) {
      await expensesService.update(editing.id, data);
    } else {
      await expensesService.create(data);
    }

    setOpen(false);
    setEditing(null);
    refetch();
  }

  async function handleDelete(id: string) {
    await expensesService.delete(id);
    refetch();
  }

  return (
    <>
      <ExpenseSummaryCards />

      <button onClick={() => setOpen(true)}>
        Nova despesa
      </button>

      <ExpenseTable />

      <ExpenseModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        initialData={editing}
        onSubmit={handleSubmit}
      />
    </>
  );
}