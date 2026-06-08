import { create } from 'zustand';
import { User } from '@/types/auth';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  isAdmin: boolean;
  isUser: boolean;
  isManager: boolean;
  isSupport: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  isAdmin: false,
  isUser: false,
  isManager: false,
  isSupport: false,

  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
      isUser: user?.role === 'USER',
      isManager: user?.role === 'MANAGER',
      isSupport: user?.role === 'SUPPORT',  
    })),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isUser: false,
      isLoading: false,
    }),
}));