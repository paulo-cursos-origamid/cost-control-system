"use client";

import Link from "next/link";

import {
  Wallet,
  Receipt,
  Tags,
  Car,
} from "lucide-react";

import styles from "./quick-actions.module.scss";

const actions = [
  {
    title: "Nova Conta",
    href: "/accounts",
    icon: Wallet,
  },
  {
    title: "Nova Transação",
    href: "/transactions",
    icon: Receipt,
  },
  {
    title: "Nova Categoria",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Novo Veículo",
    href: "/vehicles",
    icon: Car,
  },
];

export function QuickActions() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Ações Rápidas
      </h2>

      <div className={styles.grid}>
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={styles.card}
            >
              <Icon size={24} />

              <span>{action.title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}