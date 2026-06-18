import { apiFetch } from "@/lib/api/fetcher";
import { CrudListResponse } from "@/components/shared/crud/types";

export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  description?: string;
  createdAt: string;
};

export type CreateTransactionDTO = {
  accountId: string;
  type: TransactionType;
  amount: number;
  description?: string;
};

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;

export type TransactionListResponse = CrudListResponse<Transaction>;

export const transactionsService = {
  async list(params?: {
    page?: number;
    limit?: number;
  }): Promise<TransactionListResponse> {
    const query = new URLSearchParams();

    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));

    const endpoint = `/api/transactions?${query.toString()}`;

    return apiFetch(endpoint, {
      method: "GET",
    });
  },

  async getById(id: string): Promise<Transaction> {
    return apiFetch(`/api/transactions/${id}`, {
      method: "GET",
    });
  },

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    return apiFetch(`/api/transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
    return apiFetch(`/api/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string): Promise<void> {
    return apiFetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
  },
};
