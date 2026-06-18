import { apiFetch } from "@/lib/api";
import { User } from "../types/user.types";

export const usersService = {
  getAll(): Promise<User[]> {
    return apiFetch<User[]>("/api/users");
  },

  create(data: Partial<User>): Promise<User> {
    return apiFetch<User>("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<User>): Promise<User> {
    return apiFetch<User>(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string): Promise<void> {
    return apiFetch<void>(`/api/users/${id}`, {
      method: "DELETE",
    });
  },
};