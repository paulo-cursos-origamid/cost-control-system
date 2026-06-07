'use client';

import { useRouter } from 'next/navigation';

import { logout } from '@/modules/auth/services/auth.service';

import { useAuthStore } from '@/modules/auth/store/auth.store';

export function useLogout() {
  const router = useRouter();

  const clearAuth = useAuthStore(
    (state) => state.logout,
  );

  async function signOut() {
    await logout();

    clearAuth();

    router.push('/login');
  }

  return {
    signOut,
  };
}
