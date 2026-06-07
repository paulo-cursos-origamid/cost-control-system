'use client';

import { useLogout } from '@/modules/auth/hooks/use-logout';

import { useAuth } from '@/modules/auth/hooks/use-auth';

import styles from './header.module.scss';

export function Header() {
  const { signOut } = useLogout();

  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div>
        Bem-vindo,
        {' '}
        {user?.email}
      </div>

      <button onClick={signOut}>
        Sair
      </button>
    </header>
  );
}
