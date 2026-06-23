import { apiFetch } from "@/lib/api";

import type { Category } from "../types/category.types";

type CategoryPayload = {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  type: "INCOME" | "EXPENSE";
  isVehicleCategory?: boolean;
  parentId?: string;
};

export const categoryService = {
  findAll() {
    return apiFetch<Category[]>("/api/categories");
  },

  findOne(id: string) {
    return apiFetch<Category>(`/api/categories/${id}`);
  },

  create(data: CategoryPayload) {
    return apiFetch<Category>("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: CategoryPayload) {
    return apiFetch<Category>(`/api/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string) {
    return apiFetch<void>(`/api/categories/${id}`, {
      method: "DELETE",
    });
  },
};
