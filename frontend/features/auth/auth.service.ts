import { api } from "@/lib/api/fetcher";

type LoginData = {
  email: string;
  password: string;
  role: "admin" | "user";
};

export const authService = {
  async login(data: LoginData) {
    return api("/api/auth/login", "POST", data);
  },

  async logout() {
    return api("/api/auth/logout", "POST");
  },

  async me() {
    return api("/api/auth/me", "GET");
  },
};