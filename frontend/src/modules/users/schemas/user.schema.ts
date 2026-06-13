import { CrudSchema } from "@/components/shared/crud/types";

export const userSchema: CrudSchema = {
  title: "Usuário",

  endpoint: "/api/users",

  columns: [
    {
      key: "name",
      label: "Nome",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Perfil",
    },
  ],

  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      placeholder: "Digite o nome",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Digite o email",
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite a senha",
    },
    {
      name: "role",
      label: "Perfil",
      type: "select",
      options: [
        { label: "Administrador", value: "ADMIN" },
        { label: "Usuário", value: "USER" },
        { label: "Gerente", value: "MANAGER" },
        { label: "Suporte", value: "SUPPORT" },
      ],
    },
  ],
};
