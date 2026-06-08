import { useAuthStore } from "@/modules/auth/store/auth.store";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    isUser,
  };
}
