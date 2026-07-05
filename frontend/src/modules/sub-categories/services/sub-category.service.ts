import { apiFetch } from "@/lib/api/fetcher";

import { SubCategory } from "../types/sub-category.types";

export const subCategoryService = {
  findAll(): Promise<SubCategory[]> {
    return apiFetch("/api/sub-categories");
  },

  create(data: Partial<SubCategory>): Promise<SubCategory> {
    return apiFetch("/api/sub-categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(
    id: string,
    data: Partial<SubCategory>,
  ): Promise<SubCategory> {
    return apiFetch(`/api/sub-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string): Promise<void> {
    return apiFetch(`/api/sub-categories/${id}`, {
      method: "DELETE",
    });
  },
};