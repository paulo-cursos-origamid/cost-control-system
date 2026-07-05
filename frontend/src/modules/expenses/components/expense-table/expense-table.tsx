// "use client";

// import styles from "./expense-table.module.scss";

// import { useExpenses } from "../../hooks/use-expenses";

// export function ExpenseTable() {
//   const { data, loading } = useExpenses();

//   if (loading) {
//     return <div className={styles.loading}>Carregando despesas...</div>;
//   }

//   if (!data.length) {
//     return <div className={styles.empty}>Nenhuma despesa encontrada</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Título</th>
//             <th>Categoria</th>
//             <th>Conta</th>
//             <th>Data</th>
//             <th>Valor</th>
//             <th>Ações</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((expense) => (
//             <tr key={expense.id}>
//               <td>
//                 <div className={styles.title}>
//                   {expense.title}
//                   {expense.description && (
//                     <small>{expense.description}</small>
//                   )}
//                 </div>
//               </td>

//               <td>{expense.title}</td>

//               <td>{expense.title}</td>

//               <td>
//                 {new Date(expense.date).toLocaleDateString("pt-BR")}
//               </td>

//               <td className={styles.expense}>
//                 -{" "}
//                 {expense.amount.toLocaleString("pt-BR", {
//                   style: "currency",
//                   currency: "BRL",
//                 })}
//               </td>

//               <td>
//                 <div className={styles.actions}>
//                   <button>Editar</button>
//                   <button>Excluir</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import styles from "./expense-table.module.scss";

import { Pencil, Trash2 } from "lucide-react";
import { Expense } from "../../types/expense.types";

type Props = {
  expenses?: Expense[];
  loading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => Promise<void>;
};

export function ExpenseTable({
  expenses = [],
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className={styles.loading}>
        Carregando despesas...
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className={styles.empty}>
        Nenhuma despesa encontrada
      </div>
    );
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
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                <div className={styles.title}>
                  {expense.title}

                  {expense.description && (
                    <small>{expense.description}</small>
                  )}
                </div>
              </td>

              <td>{expense.category?.name ?? "-"}</td>
              

              <td>{expense.account?.name ?? "-"}</td>

              <td>
                {expense.date
                  ? new Date(expense.date).toLocaleDateString("pt-BR")
                  : "-"}
              </td>

              <td className={styles.expense}>
                {typeof expense.amount === "number"
                  ? expense.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ 0,00"}
              </td>

              <td>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => onEdit(expense)}
                    title="Editar despesa"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    className={`${styles.iconButton} ${styles.danger}`}
                    onClick={() => onDelete(expense.id)}
                    title="Excluir despesa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}