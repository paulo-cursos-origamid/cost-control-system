import { CrudSchema } from "@/components/shared/crud/types";

export const accountSchema: CrudSchema = {
  title: "Conta",

  endpoint: "/api/accounts",

  method: "POST",

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
      key: "balance",
      label: "Saldo",
    },
  ],

  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
    },

    {
      name: "type",
      label: "Tipo",
      type: "select",

      options: [
        {
          label: "Conta Corrente",
          value: "CHECKING",
        },
        {
          label: "Poupança",
          value: "SAVINGS",
        },
        {
          label: "Dinheiro",
          value: "CASH",
        },
        {
          label: "Investimento",
          value: "INVESTMENT",
        },
      ],
    },

    {
      name: "balance",
      label: "Saldo Inicial",
      type: "number",
    },
  ],
};
