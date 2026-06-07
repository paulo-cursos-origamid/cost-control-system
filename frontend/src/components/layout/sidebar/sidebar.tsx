'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { dashboardNavigation } from '@/configs/navigation';

import styles from './sidebar.module.scss';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        CCP
      </div>

      <nav className={styles.navigation}>
        {dashboardNavigation.map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${
                isActive
                  ? styles.active
                  : ''
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
