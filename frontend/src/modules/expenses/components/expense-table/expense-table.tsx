"use client";

import styles from "./expense-table.module.scss";

import { useExpenses } from "../../hooks/use-expenses";

export function ExpenseTable() {
  const { data, loading } = useExpenses();

  if (loading) {
    return <div className={styles.loading}>Carregando despesas...</div>;
  }

  if (!data.length) {
    return <div className={styles.empty}>Nenhuma despesa encontrada</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Conta</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((expense) => (
            <tr key={expense.id}>
              <td>
                <div className={styles.title}>
                  {expense.title}
                  {expense.description && (
                    <small>{expense.description}</small>
                  )}
                </div>
              </td>

              <td>{expense.title}</td>

              <td>{expense.title}</td>

              <td>
                {new Date(expense.date).toLocaleDateString("pt-BR")}
              </td>

              <td className={styles.expense}>
                -{" "}
                {expense.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td>
                <div className={styles.actions}>
                  <button>Editar</button>
                  <button>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}