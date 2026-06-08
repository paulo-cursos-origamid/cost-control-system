import type { User } from "@/types/auth";
import { apiFetch } from "@/lib/api";

export interface LoginDTO {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginDTO) =>
    apiFetch<void>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () =>
    apiFetch<User>("/api/auth/me", {
      method: "GET",
    }),

  logout: () =>
    apiFetch<void>("/api/auth/logout", {
      method: "POST",
    }),
};
