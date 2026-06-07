import { useState } from "react";

import { authService } from "@/features/auth/auth.service";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      setLoading(true);

      setError(null);

      await authService.login({
        email,
        password,
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao realizar login");
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    await authService.logout();
  }

  return {
    login,
    logout,
    loading,
    error,
  };
}
