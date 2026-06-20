export type TransactionType =
  | "INCOME"
  | "EXPENSE"
  | "TRANSFER";

export interface Transaction {
  id: string;

  title: string;

  description?: string;

  amount: number;

  type: TransactionType;

  date: string;

  accountId: string;

  categoryId: string;

  createdAt: string;

  updatedAt: string;
}