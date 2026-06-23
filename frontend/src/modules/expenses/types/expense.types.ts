// import { Transaction } from "@/modules/transactions/types/transaction.types";

export type Expense = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: string;
  accountId: string;
  categoryId: string;
  creditCardId?: string;
};
// export interface ExpenseFormData {
//   title: string;
//   description?: string;
//   amount: number;
//   date: string;
//   accountId: string;
//   categoryId: string;
//   creditCardId?: string;
//   type: "EXPENSE";
// }
export type ExpenseFormData = {
  title: string;
  description?: string;
  amount: number;
  date: string;
  accountId: string;
  categoryId: string;
  creditCardId?: string;
};