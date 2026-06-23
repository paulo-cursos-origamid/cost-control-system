"use client";

import { useState } from "react";

import { CreateCategoryModal } from "../components/create-category-modal/create-category-modal";
import { CategoriesTable } from "../components/categories-table/categories-table";

import { useCategories } from "../hooks/use-categories";
import { categoryService } from "../services/category.service";
import type { Category } from "../types/category.types";
import { CategoriesFilters } from "../components/categories-filters/categories-filters";

export function CategoriesPage() {
  const { categories, loading, reload } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  async function handleDelete(categoryId: string) {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }

    await categoryService.delete(categoryId);
    await reload();
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingCategory(null);
    setIsModalOpen(false);
  }
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = !type || category.type === type;

    return matchesSearch && matchesType;
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1>Categorias</h1>
          <p>Gerencie categorias de receitas e despesas.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          style={{
            padding: "12px 20px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "#3b82f6",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Nova categoria
        </button>
      </div>

      <CategoriesFilters
        search={search}
        type={type}
        onSearchChange={setSearch}
        onTypeChange={setType}
      />
      <CategoriesTable
        categories={filteredCategories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateCategoryModal
        key={String(isModalOpen)}
        open={isModalOpen}
        initialData={editingCategory ?? undefined}
        onClose={handleCloseModal}
        onSaved={() => {
          void reload();
          handleCloseModal();
        }}
      />
    </div>
  );
}
