import { apiFetch } from "@/lib/api";

import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "../types/user.types";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
};

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await apiFetch<ApiResponse<User[]>>("/api/users");

    return response.data;
  },

  async create(data: CreateUserDTO): Promise<User> {
    const response = await apiFetch<ApiResponse<User>>("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.data;
  },

  async update(
    id: string,
    data: UpdateUserDTO,
  ): Promise<User> {
    const response = await apiFetch<ApiResponse<User>>(
      `/api/users/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiFetch(`/api/users/${id}`, {
      method: "DELETE",
    });
  },
};