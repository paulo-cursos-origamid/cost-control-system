import { apiFetch } from "@/lib/api";

export const subCategoriesApi = {
  list(categoryId: string) {
    return apiFetch(`/sub-categories?categoryId=${categoryId}`);
  },
};
