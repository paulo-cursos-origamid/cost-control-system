"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/configs/navigation";

import { useAuth } from "@/modules/auth/hooks/use-auth";

import styles from "./sidebar.module.scss";

export function Sidebar() {
  const pathname = usePathname();

  const { user } = useAuth();

  const navigation = dashboardNavigation.filter(
    (item) => !!user?.role && item.roles.includes(user.role),
  );
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>CCP</div>

      <nav className={styles.navigation}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
