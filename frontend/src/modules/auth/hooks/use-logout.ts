'use client';

import { useRouter } from 'next/navigation';

import { authApi } from '@/modules/auth/api/auth.api';
import { useAuthStore } from '@/modules/auth/store/auth.store';

export function useLogout() {
  const router = useRouter();

  const logoutStore = useAuthStore((state) => state.logout);

  async function signOut() {
    try {
      await authApi.logout();
    } catch {
      // mesmo se falhar backend, limpa frontend
    }

    logoutStore();

    router.push('/login');
  }

  return { signOut };
}