"use client";

import { CrudPage } from "@/components/shared/crud/CrudPage";
import { useCrud } from "@/components/shared/crud/useCrud";

import { userSchema } from "../schemas/user.schema";
import { userService } from "../services/users.service";

export function UsersPage() {
  const { data, deleteItem, fetchData } = useCrud(userService);

  return (
    <CrudPage
      schema={userSchema}
      data={data}
      onDelete={deleteItem}
      onRefresh={fetchData}
    />
  );
}
