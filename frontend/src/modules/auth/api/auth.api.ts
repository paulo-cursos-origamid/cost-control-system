import { apiFetch } from "@/lib/api";

import { User } from "@/modules/users/types/user.types";

export interface LoginDTO {
  email: string;

  password: string;
}

export const authApi = {
  login: (data: LoginDTO) =>
    apiFetch("/api/auth/login", {
      method: "POST",

      body: JSON.stringify(data),
    }),

  me: () =>
    apiFetch<User>("/api/auth/me", {
      method: "GET",
    }),

  logout: () =>
    apiFetch("/api/auth/logout", {
      method: "POST",
    }),
};
