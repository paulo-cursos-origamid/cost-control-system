import { Transaction } from "@/modules/transactions/types/transaction.types";

export interface Expense extends Transaction {
  type: "EXPENSE";
}
export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  date: string;
  accountId: string;
  categoryId: string;
  creditCardId?: string;
  type: "EXPENSE";
}