"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, X, BarChart3 } from "lucide-react";

import { dashboardNavigation } from "@/configs/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";

import styles from "./sidebar.module.scss";
import logo from "../../../../public/ccp-logo.png"; // 👈 coloque sua imagem aqui
import { LoadingState } from "@/components/feedback/loading-state/loading-state";

export function Sidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src={logo}
                alt="CCP Logo"
                width={76}
                height={76}
                priority
              />
              <h6>Centro de Controle Pessoal</h6>
            </div>
          </div>
          <div className={styles.loading}>
            <LoadingState />
          </div>
        </aside>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const items = dashboardNavigation.filter((item) =>
    item.roles.includes(user.role),
  );

  return (
    <>
      {/* HAMBURGER MOBILE */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}>
        {/* LOGO */}
        <div className={styles.logo}>
          <div>
            <div className={styles.logoImageWrapper}>
              <Image
                src={logo}
                alt="CCP Logo"
                width={76}
                height={76}
                priority
              />
            </div>
            <h6>Centro de Controle Pessoal</h6>
          </div>
        </div>

        <button
          className={styles.closeButton}
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </button>

        <span className={styles.version}>v1.0</span>

        {/* MENU */}
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
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className={styles.footer}>
          <small>{user.name}</small>

          <span>{user.role}</span>
        </div>
      </aside>

      {/* OVERLAY */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
