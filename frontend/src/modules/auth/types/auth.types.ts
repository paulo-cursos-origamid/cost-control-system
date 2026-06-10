import { User } from "@/modules/users/types/user.types";

export interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  setUser: (user: User | null) => void;

  setLoading: (isLoading: boolean) => void;

  logout: () => void;
}
