"use client";

import { ReactNode, useEffect } from "react";

import { getMe } from "@/modules/auth/services/auth.service";

import { useAuthStore } from "@/modules/auth/store/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const setLoading = useAuthStore(
    (state) => state.setLoading
  );

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getMe();

        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [setUser, setLoading]);

  return <>{children}</>;
}