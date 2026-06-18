import { CrudSchema } from "@/components/shared/crud/types";

export const accountSchema: CrudSchema = {
  title: "Contas",

  endpoint: "/api/accounts",

  columns: [
    {
      key: "name",
      label: "Nome",
    },

    {
      key: "type",
      label: "Tipo",
    },

    {
      key: "initialBalance",
      label: "Saldo Inicial",

      render: (value: unknown) =>
        Number(value ?? 0).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
  ],

  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
    },

    {
      name: "type",
      label: "Tipo",
      type: "select",
      required: true,

      options: [
        { label: "Dinheiro", value: "CASH" },
        { label: "Conta Corrente", value: "CHECKING" },
        { label: "Poupança", value: "SAVINGS" },
        { label: "Cartão de Crédito", value: "CREDIT_CARD" },
        { label: "Investimento", value: "INVESTMENT" },
      ],
    },

    {
      name: "initialBalance",
      label: "Saldo Inicial",
      type: "number",
    },
  ],
};