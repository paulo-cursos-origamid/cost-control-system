import { UserRole } from "@/modules/users/types/user.types";

interface NavigationItem {
  label: string;

  href: string;

  roles: UserRole[];
}

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Dashboard",

    href: "/dashboard",

    roles: [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER, UserRole.SUPPORT],
  },

  {
    label: "Contas",

    href: "/accounts",

    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Transações",

    href: "/transactions",

    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Categorias",

    href: "/categories",

    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Relatórios",

    href: "/reports",

    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },

  {
    label: "Usuários",

    href: "/users",

    roles: [UserRole.ADMIN],
  },
];
