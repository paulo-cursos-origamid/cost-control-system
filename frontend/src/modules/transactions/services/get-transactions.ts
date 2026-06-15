import { apiFetch } from "@/lib/api";

import { Transaction } from "../types/transaction.type";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export async function getTransactions() {
  return apiFetch<ApiResponse<Transaction[]>>(
    "/api/transactions",
  );
}
