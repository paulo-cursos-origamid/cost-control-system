"use client";

import styles from "./top-categories.module.scss";

type Category = {
  categoryId: string;
  categoryName: string;
  total: number;
};

type Props = {
  categories: Category[];
};

export function TopCategories({
  categories,
}: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Categorias
      </h3>

      {categories.map((category) => (
        <div
          key={category.categoryId}
          className={styles.row}
        >
          <span>{category.categoryName}</span>

          <strong>
            R$ {category.total.toFixed(2)}
          </strong>
        </div>
      ))}
    </div>
  );
}