import { apiFetch } from "@/lib/api";
import { Account } from "../types/account.types";

export const accountsService = {
  getAll(): Promise<Account[]> {
    return apiFetch<Account[]>("/api/accounts");
  },

  create(data: Partial<Account>): Promise<Account> {
    return apiFetch<Account>("/api/accounts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<Account>): Promise<Account> {
    return apiFetch<Account>(`/api/accounts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string): Promise<void> {
    return apiFetch<void>(`/api/accounts/${id}`, {
      method: "DELETE",
    });
  },

  restore(id: string): Promise<Account> {
    return apiFetch<Account>(`/api/accounts/${id}/restore`, {
      method: "PATCH",
    });
  },
};