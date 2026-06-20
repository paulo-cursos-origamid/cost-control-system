"use client";

import styles from "./accounts-summary.module.scss";

type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
  isActive: boolean;
};

type Props = {
  accounts: Account[];
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function AccountsSummary({
  accounts,
}: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Contas Financeiras
      </h3>

      <div className={styles.grid}>
        {accounts.map((account) => (
          <div
            key={account.id}
            className={styles.card}
          >
            <span className={styles.name}>
              {account.name}
            </span>

            <span className={styles.type}>
              {account.type}
            </span>

            <strong className={styles.balance}>
              {formatCurrency(account.balance)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}