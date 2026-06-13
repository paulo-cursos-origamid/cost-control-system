"use client";

import { useCallback, useEffect, useState } from "react";

export interface CrudService<
  T,
  CreateDto = Partial<T>,
  UpdateDto = Partial<T>,
> {
  getAll: () => Promise<T[]>;

  create: (data: CreateDto) => Promise<T>;

  update: (id: string, data: UpdateDto) => Promise<T>;

  delete: (id: string) => Promise<void>;
}

export function useCrud<
  T extends { id: string },
  CreateDto = Partial<T>,
  UpdateDto = Partial<T>,
>(service: CrudService<T, CreateDto, UpdateDto>) {
  const [data, setData] = useState<T[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await service.getAll();

      setData(Array.isArray(result) ? result : []);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  async function createItem(payload: CreateDto) {
    await service.create(payload);

    await fetchData();
  }

  async function updateItem(id: string, payload: UpdateDto) {
    await service.update(id, payload);

    await fetchData();
  }

  async function deleteItem(id: string) {
    await service.delete(id);

    await fetchData();
  }

  return {
    data,
    loading,
    createItem,
    updateItem,
    deleteItem,
    fetchData,
  };
}
