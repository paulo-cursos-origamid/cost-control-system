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

        console.log("AUTH RESPONSE JSON", JSON.stringify(response, null, 2));

        const user =
          (response as any)?.data?.data ?? (response as any)?.data ?? response;

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
