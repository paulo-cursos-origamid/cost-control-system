import { create } from "zustand";
import { authApi } from "../api/auth.api";

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  fetchUser: async () => {
    try {
      const user = await authApi.me();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  login: async (email, password) => {
    await authApi.login({ email, password });

    const user = await authApi.me();

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await authApi.logout();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
