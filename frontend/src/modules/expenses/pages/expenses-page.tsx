"use client";

import { useState } from "react";

import { ExpenseSummaryCards } from "../components/expense-summary-cards/expense-summary-cards";
import { ExpenseTable } from "../components/expense-table/expense-table";
import { ExpenseModal } from "../components/expense-modals/expense-modal";

import { useExpenses } from "../hooks/use-expenses";
import { expensesService } from "../services/expenses.service";
import { Expense } from "../types/expense.types";
import { ExpenseFormData } from "../types/expense.types";

export function ExpensesPage() {
  const { refetch } = useExpenses();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | undefined>(undefined);

  async function handleSubmit(data: ExpenseFormData) {
    if (editing) {
      await expensesService.update(editing.id, data);
    } else {
      await expensesService.create(data);
    }

    setOpen(false);
    setEditing(undefined);
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
          setEditing(undefined);
        }}
        initialData={editing}
        onSubmit={handleSubmit}
      />
    </>
  );
}