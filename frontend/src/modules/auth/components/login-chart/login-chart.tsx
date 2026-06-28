"use client";

import styles from "./login-chart.module.scss";

export function LoginChart() {
  return (
    <div className={styles.chartContainer}>
      <svg
        viewBox="0 0 500 200"
        className={styles.chart}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>

        {/* Área do gráfico */}
        <path
          className={styles.area}
          d="
            M0,180
            L0,160
            C40,150 60,120 100,125
            C140,130 180,70 220,90
            C260,110 300,40 340,60
            C380,80 420,20 500,40
            L500,180
            Z
          "
        />

        {/* Linha principal */}
        <path
          className={styles.line}
          d="
            M0,160
            C40,150 60,120 100,125
            C140,130 180,70 220,90
            C260,110 300,40 340,60
            C380,80 420,20 500,40
          "
        />

        {/* Pontos */}
        <circle className={styles.dot} cx="100" cy="125" r="5" />
        <circle className={styles.dot} cx="220" cy="90" r="5" />
        <circle className={styles.dot} cx="340" cy="60" r="5" />
        <circle className={styles.dot} cx="500" cy="40" r="6" />
      </svg>
    </div>
  );
}
