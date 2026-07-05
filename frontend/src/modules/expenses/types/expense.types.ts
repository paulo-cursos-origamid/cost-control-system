export type Expense = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: string;

  type: "INCOME" | "EXPENSE";

  accountId: string;
  categoryId: string;
  subCategoryId: string;
  creditCardId?: string;

  category?: {
    id: string;
    name: string;
  };
 subCategory?: {
    id: string;
    name: string;
  };
  account?: {
    id: string;
    name: string;
  };
};

/**
 * DTO usado no formulário (CREATE / UPDATE)
 * exatamente igual ao backend CreateTransactionDto
 */
export type ExpenseFormData = {
  title: string;
  description?: string;
  amount: number;
  date: string;

  type: "INCOME" | "EXPENSE";

  accountId: string;
  categoryId: string;
  subCategoryId?: string;
  creditCardId?: string;
};