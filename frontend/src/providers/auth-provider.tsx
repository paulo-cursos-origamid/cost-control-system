"use client";

import { ReactNode, useEffect } from "react";

import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/store/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await authApi.me();

        console.log("AUTH RESPONSE JSON", response);

        // ✅ PADRÃO ÚNICO E LIMPO
        const user = response.data?.data ?? response.data;
        setUser(user);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    void loadUser();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
