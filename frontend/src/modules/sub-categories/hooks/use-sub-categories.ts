import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api/fetcher";

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export function useSubCategories(categoryId?: string) {
  const [data, setData] = useState<SubCategory[]>([]);

  useEffect(() => {
    async function load() {
      if (!categoryId) {
        setData([]);
        return;
      }

      try {
        const response = await apiFetch<SubCategory[]>(
          `/api/sub-categories?categoryId=${categoryId}`,
        );

        setData(response);
      } catch (error) {
        console.error(error);
        setData([]);
      }  
    }

    void load();
    
  }, [categoryId]);

  return {
    data,
    reload: () => {
      void (async () => {
        if (!categoryId) {
          setData([]);
          return;
        }

        try {
          const response = await apiFetch<SubCategory[]>(
            `/api/sub-categories?categoryId=${categoryId}`,
          );

          setData(response);
        } catch (error) {
          console.error(error);
          setData([]);
        }
      })();
    },
  };
}
