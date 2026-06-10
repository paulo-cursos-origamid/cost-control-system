import { useAuthStore } from "@/modules/auth/store/auth.store";

import { UserRole } from "@/modules/users/types/user.types";

export function useAuth() {
  const user = useAuthStore((s) => s.user);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isLoading = useAuthStore((s) => s.isLoading);

  const isAdmin = user?.role === UserRole.ADMIN;

  const isUser = user?.role === UserRole.USER;

  const isManager = user?.role === UserRole.MANAGER;

  const isSupport = user?.role === UserRole.SUPPORT;

  return {
    user,

    isAuthenticated,

    isLoading,

    isAdmin,

    isUser,

    isManager,

    isSupport,
  };
}
