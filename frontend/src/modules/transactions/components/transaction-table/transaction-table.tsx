"use client";

import { Transaction } from "../../types/transaction.types";

import styles from "./transaction-table.module.scss";

type Props = {
  data: Transaction[];
  onRefresh?: () => void;
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getTypeLabel(type: string) {
  switch (type) {
    case "INCOME":
      return "Receita";

    case "EXPENSE":
      return "Despesa";

    case "TRANSFER":
      return "Transferência";

    default:
      return type;
  }
}

export function TransactionTable({ data }: Props) {
  if (!data.length) {
    return (
      <div className={styles.empty}>
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Conta</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {data.map((tx) => (
            <tr key={tx.id}>
              <td>
                <div className={styles.description}>
                  <strong>{tx.title}</strong>

                  {tx.description && (
                    <span>{tx.description}</span>
                  )}
                </div>
              </td>

              <td>
                {(tx as any).category?.name ?? "-"}
              </td>

              <td>
                {(tx as any).account?.name ?? "-"}
              </td>

              <td>
                <span
                  className={`${styles.badge} ${
                    tx.type === "INCOME"
                      ? styles.income
                      : tx.type === "EXPENSE"
                        ? styles.expense
                        : styles.transfer
                  }`}
                >
                  {getTypeLabel(tx.type)}
                </span>
              </td>

              <td
                className={
                  tx.type === "INCOME"
                    ? styles.amountIncome
                    : styles.amountExpense
                }
              >
                {formatCurrency(tx.amount)}
              </td>

              <td>
                {new Date(tx.date).toLocaleDateString(
                  "pt-BR",
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}