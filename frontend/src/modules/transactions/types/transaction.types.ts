export type TransactionType =
  | "INCOME"
  | "EXPENSE";

export interface Transaction {
  id: string;
  title: string;
  description?: string;

  amount: number;

  type: TransactionType;

  date: string;

  accountId: string;
  categoryId: string;

  creditCardId?: string;

  createdAt: string;
  updatedAt: string;
}
