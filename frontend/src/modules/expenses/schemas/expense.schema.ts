import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  amount: z.number().positive(),

  date: z.string(),

  accountId: z.string().uuid(),

  categoryId: z.string().uuid(),

  creditCardId: z.string().uuid().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;