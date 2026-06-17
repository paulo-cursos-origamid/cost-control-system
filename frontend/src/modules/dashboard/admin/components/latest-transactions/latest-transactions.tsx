"use client";

import { EmptyState } from "@/components/feedback/empty-state/empty-state";
import styles from "./latest-transactions.module.scss";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

interface Props {
  transactions: Transaction[];
}

export function LatestTransactions({ transactions }: Props) {
  return (
    <div className={styles.card}>
      <h3>Últimas Transações</h3>

      {transactions.length === 0 ? (
        // <p>Nenhuma transação encontrada.</p>
        <EmptyState
          title="Nenhuma transação encontrada"
          description="Cadastre sua primeira transação para visualizar movimentações."
        />
      ) : (
        <div className={styles.list}>
          {transactions.map((transaction) => (
            <div key={transaction.id} className={styles.item}>
              <div>
                <strong>{transaction.title}</strong>

                <span>{transaction.type}</span>
              </div>

              <strong
                className={
                  transaction.type === "INCOME" ? styles.income : styles.expense
                }
              >
                R$
                {transaction.amount.toLocaleString("pt-BR")}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
