"use client";

import styles from "./top-categories.module.scss";

type Category = {
  categoryId: string;
  categoryName: string;
  total: number;
  color?: string;
};

type Props = {
  categories: Category[];
};

export function TopCategories({ categories }: Props) {
  const total = categories.reduce((acc, c) => acc + c.total, 0);

  const normalized = categories.reduce<
    (Category & { percent: number; offset: number })[]
  >((acc, c) => {
    const percent = (c.total / total) * 100;
    const offset = acc.reduce((sum, item) => sum + item.percent, 0);

    acc.push({
      ...c,
      percent,
      offset,
    });

    return acc;
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Top Categorias (Despesas)</h3>
      </div>

      <div className={styles.content}>
        {/* DONUT REAL */}
        <div className={styles.chartBox}>
          <svg viewBox="0 0 36 36" className={styles.svg}>
            {normalized.map((c) => (
              <circle
                key={c.categoryId}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke={c.color ?? "#3b82f6"}
                strokeWidth="4"
                strokeDasharray={`${c.percent} ${100 - c.percent}`}
                strokeDashoffset={100 - c.offset}
              />
            ))}
          </svg>

          <div className={styles.centerText}>
            <strong>Total</strong>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* LISTA */}
        <div className={styles.list}>
          <div className={styles.legend}>
            {normalized.map((c) => (
              <div key={c.categoryId} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{ background: c.color ?? "#3b82f6" }}
                />

                <div className={styles.info}>
                  <p>{c.categoryName}</p>

                  <div className={styles.bar}>
                    <div
                      className={styles.fill}
                      style={{
                        width: `${c.percent}%`,
                        background: c.color ?? "#3b82f6",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "2px",
                  }}
                >
                  <strong style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                    {c.percent.toFixed(0)}%
                  </strong>
                  <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                    {formatCurrency(c.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
