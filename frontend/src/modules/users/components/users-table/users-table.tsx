"use client";

import { DataTable } from "@/components/tables/data-table/data-table";

import { useUsers } from "@/modules/users/hooks/use-users";

import { User } from "@/modules/users/types/user.types";

export function UsersTable() {
  const { users, loading } = useUsers();

  const columns = [
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
  ] as const;

  return (
    <DataTable<User>
      data={users}
      columns={columns}
      loading={loading}
    />
  );
}
