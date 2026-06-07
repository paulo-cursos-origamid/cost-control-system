export interface User {
  sub: string;

  email: string;
}

export interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  setUser: (user: User | null) => void;

  setLoading: (loading: boolean) => void;

  logout: () => void;
}
