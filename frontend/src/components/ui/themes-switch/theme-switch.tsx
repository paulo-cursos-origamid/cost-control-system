"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./theme-switch.module.scss";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as "dark" | "light" | null) || "dark";

    document.documentElement.setAttribute("data-theme", saved);

    // 🔥 NÃO usa setTheme aqui → evita warning
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") as
      | "dark"
      | "light"
      | null;

    const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);

    setTheme(next); // ✔ aqui é OK (ação do usuário)
  };

  const isDark = theme === "dark";

  return (
    <button className={styles.switch} onClick={toggleTheme} type="button">
      <div className={`${styles.track} ${isDark ? styles.dark : styles.light}`}>
        <div className={styles.thumb}>
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </div>
      </div>
    </button>
  );
}
