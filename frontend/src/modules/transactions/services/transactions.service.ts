import { apiFetch } from "@/lib/api/fetcher";

export const transactionService = {
  findAll: () => apiFetch("/api/transactions"),

  create: (data: unknown) =>
    apiFetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: unknown) =>
    apiFetch(`/api/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    apiFetch(`/api/transactions/${id}`, {
      method: "DELETE",
    }),
};
