import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { categoryService } from "../services/category.service";

import type { Category } from "../types/category.types";

export function useCategories() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadCategories =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await categoryService.findAll();

        setCategories(response.data);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    reload: loadCategories,
  };
}
