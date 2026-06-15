"use client";

import { DataTable } from "@/components/tables/data-table/data-table";

import { useCategories } from "../hooks/use-categories";

import type { Category } from "../types/category.types";

export function CategoriesPage() {
  const { categories, loading } = useCategories();

  const columns = [
    {
      key: "name",
      label: "Nome",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "type",
      label: "Tipo",
    },
    {
      key: "color",
      label: "Cor",
    },
    {
      key: "isVehicleCategory",
      label: "Veículo",
    },
  ] satisfies {
    key: keyof Category;
    label: string;
  }[];

  return (
    <div>
      <h1>Categorias</h1>

      <DataTable<Category>
        data={categories}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}
