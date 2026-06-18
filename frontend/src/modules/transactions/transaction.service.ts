import { apiFetch } from "@/lib/api";
import { Transaction } from "../types/transaction.types";

export const transactionsService = {
  getAll(): Promise<Transaction[]> {
    return apiFetch<Transaction[]>("/api/transactions");
  },

  create(data: Partial<Transaction>): Promise<Transaction> {
    return apiFetch<Transaction>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    return apiFetch<Transaction>(`/api/transactions/${id}`, {
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
