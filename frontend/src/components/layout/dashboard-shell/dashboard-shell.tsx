import { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/sidebar/sidebar';

import { Header } from '@/components/layout/header/header';

import { Content } from '@/components/layout/content/content';

import styles from './dashboard-shell.module.scss';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.wrapper}>
        <Header />

        <Content>
          {children}
        </Content>
      </div>
    </div>
  );
}
