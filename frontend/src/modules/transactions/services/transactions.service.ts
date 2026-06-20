import { apiFetch } from "@/lib/api";

import { Transaction } from "../types/transaction.types";
import { PaginatedResponse } from "@/types/api.types";

export const transactionsService = {
  async getSummary() {
    return apiFetch<{
      income: number;
      expense: number;
      balance: number;
    }>("/api/transactions/summary");
  },
  async getAll(): Promise<Transaction[]> {
    const response =
      await apiFetch<PaginatedResponse<Transaction>>("/api/transactions");

    return response.data;
  },

  async getById(id: string) {
    return apiFetch<Transaction>(`/api/transactions/${id}`);
  },

  async create(data: Partial<Transaction>) {
    return apiFetch<Transaction>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<Transaction>) {
    return apiFetch<Transaction>(`/api/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return apiFetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
  },
};
