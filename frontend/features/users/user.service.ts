import { api } from "@/lib/api/fetcher";

export const userService = {
  getAll: () => api("/api/users"),
  getById: (id: string) => api(`/api/users/${id}`),
  create: (data: any) => api("/api/users", "POST", data),
  update: (id: string, data: any) => api(`/api/users/${id}`, "PATCH", data),
  delete: (id: string) => api(`/api/users/${id}`, "DELETE"),
};
