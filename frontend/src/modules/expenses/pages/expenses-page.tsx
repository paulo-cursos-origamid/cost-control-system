"use client";

import { useState } from "react";

import styles from "./expenses.page.module.scss";

import { ExpenseSummaryCards } from "../components/expense-summary-cards/expense-summary-cards";
import { ExpenseTable } from "../components/expense-table/expense-table";
import { ExpenseModal } from "../components/expense-modals/expense-modal";

import { useExpenses } from "../hooks/use-expenses";
import { expensesService } from "../services/expenses.service";

import { Expense, ExpenseFormData } from "../types/expense.types";

export function ExpensesPage() {
  const { data: expenses, loading, refetch } = useExpenses();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | undefined>();

  async function handleSubmit(data: ExpenseFormData) {
    if (editing) {
      await expensesService.update(editing.id, data);
    } else {
      await expensesService.create(data);
    }

    setOpen(false);
    setEditing(undefined);

    await refetch();
  }

  function handleEdit(expense: Expense) {
    setEditing(expense);
    setOpen(true);
  }

  async function handleDelete(id: string) {
    await expensesService.delete(id);

    await refetch();
  }

  function handleCreate() {
    setEditing(undefined);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setEditing(undefined);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Despesas</h1>
          <p className={styles.subtitle}>Gerencie todas as suas despesas</p>
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={handleCreate}
        >
          + Nova despesa
        </button>
      </div>

      <ExpenseSummaryCards />

      <ExpenseTable
        expenses={expenses}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseModal
        open={open}
        onClose={handleClose}
        initialData={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// "use client";

// import { useState } from "react";

// import { ExpenseSummaryCards } from "../components/expense-summary-cards/expense-summary-cards";
// import { ExpenseTable } from "../components/expense-table/expense-table";
// import { ExpenseModal } from "../components/expense-modals/expense-modal";

// import { useExpenses } from "../hooks/use-expenses";
// import { expensesService } from "../services/expenses.service";

// import { Expense } from "../types/expense.types";
// import { ExpenseFormData } from "../types/expense.types";

// export function ExpensesPage() {
//   const {
//     data: expenses,
//     loading,
//     refetch,
//   } = useExpenses();

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Expense | undefined>();

//   async function handleSubmit(data: ExpenseFormData) {
//     if (editing) {
//       await expensesService.update(editing.id, data);
//     } else {
//       await expensesService.create(data);
//     }

//     setOpen(false);
//     setEditing(undefined);

//     await refetch();
//   }

//   function handleEdit(expense: Expense) {
//     setEditing(expense);
//     setOpen(true);
//   }

//   async function handleDelete(id: string) {
//     await expensesService.delete(id);

//     await refetch();
//   }

//   function handleCreate() {
//     setEditing(undefined);
//     setOpen(true);
//   }

//   return (
//     <>
//       <ExpenseSummaryCards />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "24px",
//         }}
//       >
//         <h1>Despesas</h1>

//         <button onClick={handleCreate}>
//           + Nova despesa
//         </button>
//       </div>

//       <ExpenseTable
//         expenses={expenses}
//         loading={loading}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <ExpenseModal
//         open={open}
//         onClose={() => {
//           setOpen(false);
//           setEditing(undefined);
//         }}
//         initialData={editing}
//         onSubmit={handleSubmit}
//       />
//     </>
//   );
// }

// "use client";

// import { useState } from "react";

// import { ExpenseSummaryCards } from "../components/expense-summary-cards/expense-summary-cards";
// import { ExpenseTable } from "../components/expense-table/expense-table";
// import { ExpenseModal } from "../components/expense-modals/expense-modal";

// import { useExpenses } from "../hooks/use-expenses";
// import { expensesService } from "../services/expenses.service";
// import { Expense } from "../types/expense.types";
// import { ExpenseFormData } from "../types/expense.types";

// export function ExpensesPage() {
//   const { refetch } = useExpenses();

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Expense | undefined>(undefined);

//   async function handleSubmit(data: ExpenseFormData) {
//     if (editing) {
//       await expensesService.update(editing.id, data);
//     } else {
//       await expensesService.create(data);
//     }

//     setOpen(false);
//     setEditing(undefined);
//     refetch();
//   }

//   return (
//     <>
//       <ExpenseSummaryCards />

//       <button onClick={() => setOpen(true)}>
//         Nova despesa
//       </button>

//       <ExpenseTable />

//       <ExpenseModal
//         open={open}
//         onClose={() => {
//           setOpen(false);
//           setEditing(undefined);
//         }}
//         initialData={editing}
//         onSubmit={handleSubmit}
//       />
//     </>
//   );
// }
