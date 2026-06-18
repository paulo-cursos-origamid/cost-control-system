"use client";

import { CrudPage } from "@/components/shared/crud/CrudPage";
import { transactionSchema } from "../schemas/transaction.schema";

export function TransactionsPage() {
  return <CrudPage schema={transactionSchema} />;
}