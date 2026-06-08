import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  return {
    user,
    isAuthenticated,
    isAdmin,
    isUser,
  };
}
