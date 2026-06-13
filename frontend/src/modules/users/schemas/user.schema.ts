import { CrudSchema } from "@/components/shared/crud/types";

import { UserRole } from "../types/user.types";

export const userSchema: CrudSchema = {
  title: "Usuário",

  endpoint: "/api/users",

  method: "POST",

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
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
    },
    {
      name: "role",
      label: "Perfil",
      type: "text",
      placeholder: Object.values(UserRole).join(", "),
    },
  ],
};
