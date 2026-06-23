import { apiFetch } from "@/lib/api";
import { Expense } from "../types/expense.types";
import { ExpenseFormData } from "../types/expense.types";

export const expensesService = {
  getAll(): Promise<Expense[]> {
    return apiFetch<Expense[]>("/api/transactions?type=EXPENSE");
  },

  create(data: ExpenseFormData): Promise<Expense> {
    return apiFetch<Expense>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<ExpenseFormData>): Promise<Expense> {
    return apiFetch<Expense>(`/api/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string): Promise<void> {
    return apiFetch<void>(`/api/transactions/${id}`, {
      method: "DELETE",
    });
  },
};