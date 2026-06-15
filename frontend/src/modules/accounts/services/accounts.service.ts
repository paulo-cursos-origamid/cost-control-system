import { apiFetch } from "@/lib/api/fetcher";
import { Account } from "../types/account.types";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const accountsService = {
  async getAll() {
    const response = await apiFetch<ApiResponse<Account[]>>("/api/accounts");

    return response.data;
  },

  async create(data: Partial<Account>) {
    const response = await apiFetch<ApiResponse<Account>>("/api/accounts", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.data;
  },

  async update(id: string, data: Partial<Account>) {
    const response = await apiFetch<ApiResponse<Account>>(
      `/api/accounts/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async delete(id: string) {
    await apiFetch(`/api/accounts/${id}`, {
      method: "DELETE",
    });
  },
};
