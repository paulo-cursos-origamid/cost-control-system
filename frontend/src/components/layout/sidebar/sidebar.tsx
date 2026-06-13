"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/configs/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";

import styles from "./sidebar.module.scss";

export function Sidebar() {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  console.log("USER STORE", JSON.stringify(user, null, 2));
  if (isLoading) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>ECP</h2>
        </div>

        <div className={styles.loading}>Carregando...</div>
      </aside>
    );
  }

  if (!user) {
    return null;
  }

  const items = dashboardNavigation.filter((item) =>
    item.roles.includes(user.role),
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>ECP</h2>

        <span className={styles.version}>v1.0</span>
      </div>

      <nav className={styles.nav}>
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${active ? styles.active : ""}`}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <small>{user.name}</small>

        <span>{user.role}</span>
      </div>
    </aside>
  );
}
