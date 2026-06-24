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

    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);

    document.documentElement.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);
  };

  const isDark = theme === "dark";

  return (
    <button
      className={styles.switch}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
    >
      <div className={`${styles.track} ${isDark ? styles.dark : styles.light}`}>
        <div className={styles.thumb}>
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </div>
      </div>
    </button>
  );
}
