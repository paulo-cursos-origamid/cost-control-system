"use client";

import { CrudPage } from "@/components/shared/crud/CrudPage";

import { useAccounts } from "../hooks/use-accounts";
import { accountSchema } from "../../../modules/accounts/schemas/account.schema";

export function AccountsPage() {
  const {
    data,
    loading,
    deleteItem,
    fetchData,
  } = useAccounts();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CrudPage
      schema={accountSchema}
      data={data}
      onDelete={deleteItem}
      onRefresh={fetchData}
    />
  );
}
