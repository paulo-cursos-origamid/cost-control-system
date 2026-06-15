import { apiFetch } from "@/lib/api/fetcher";

import type { Category } from "../types/category.types";

export const categoryService = {
  findAll() {
    return apiFetch<Category[]>(
      "/api/categories",
    );
  },

  findOne(id: string) {
    return apiFetch<Category>(
      `/api/categories/${id}`,
    );
  },

  create(data: {
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    type: "INCOME" | "EXPENSE";
    isVehicleCategory?: boolean;
    parentId?: string;
  }) {
    return apiFetch<Category>(
      "/api/categories",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },
};
