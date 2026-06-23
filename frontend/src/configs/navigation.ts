import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Tags,
  FileBarChart,
  Users,
} from "lucide-react";

// import { UserRole } from "@/modules/users/types/user.types";
import { UserRole } from "@/constants/roles";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER, UserRole.SUPPORT],
  },
  {
  label: "Despesas",
  href: "/expenses",
  icon: Wallet, // ou o icon que você já usa no projeto
  roles: [UserRole.ADMIN, UserRole.USER],
},

  {
    label: "Contas",
    href: "/accounts",
    icon: Wallet,
    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Transações",
    href: "/transactions",
    icon: Receipt,
    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Categorias",
    href: "/categories",
    icon: Tags,
    roles: [UserRole.ADMIN, UserRole.USER],
  },

  {
    label: "Relatórios",
    href: "/reports",
    icon: FileBarChart,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },

  {
    label: "Usuários",
    href: "/users",
    icon: Users,
    roles: [UserRole.ADMIN],
  },
];
