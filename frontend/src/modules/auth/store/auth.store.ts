import { create } from 'zustand';

import { AuthState } from '@/modules/auth/types/auth.types';

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    isAuthenticated: false,

    isLoading: true,

    setUser: (user) =>
      set({
        user,

        isAuthenticated: !!user,
      }),

    setLoading: (
      isLoading,
    ) =>
      set({
        isLoading,
      }),

    logout: () =>
      set({
        user: null,

        isAuthenticated: false,
      }),
  }));