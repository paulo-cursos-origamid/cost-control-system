"use client";

import styles from "./latest-transactions.module.scss";

import type { Transaction as BaseTransaction, TransactionType } from "@/modules/transactions/types/transaction.types";

type Transaction = Pick<BaseTransaction, "id" | "title" | "amount" | "type" | "date">;

type Props = {
  transactions: Transaction[];
};

export function LatestTransactions({
  transactions,
}: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Últimas Transações
      </h3>

      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={styles.row}
        >
          <span>{tx.title}</span>

          <strong
            className={
              tx.type === "INCOME"
                ? styles.income
                : styles.expense
            }
          >
            R$ {tx.amount.toFixed(2)}
          </strong>
        </div>
      ))}
    </div>
  );
}