import { CrudSchema } from "@/components/shared/crud/types";

export const transactionSchema: CrudSchema = {
  title: "Transações",

  endpoint: "/api/transactions",

  columns: [
    {
      key: "type",
      label: "Tipo",
      render: (value: unknown) =>
        value === "INCOME" ? "Entrada" : "Saída",
    },

    {
      key: "amount",
      label: "Valor",
      render: (value: unknown) =>
        Number(value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },

    {
      key: "description",
      label: "Descrição",
    },

    {
      key: "createdAt",
      label: "Data",
      render: (value: unknown) =>
        new Date(String(value)).toLocaleDateString("pt-BR"),
    },
  ],

  fields: [
    {
      name: "accountId",
      label: "Conta",
      type: "text", // depois vamos transformar em select dinâmico
      required: true,
    },

    {
      name: "type",
      label: "Tipo",
      type: "select",
      required: true,
      options: [
        {
          label: "Entrada",
          value: "INCOME",
        },
        {
          label: "Saída",
          value: "EXPENSE",
        },
      ],
    },

    {
      name: "amount",
      label: "Valor",
      type: "number",
      required: true,
    },

    {
      name: "description",
      label: "Descrição",
      type: "text",
    },
  ],
};