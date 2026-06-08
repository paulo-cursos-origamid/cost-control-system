'use client';

import { useRouter } from 'next/navigation';

import { authApi } from '@/modules/auth/api/auth.api';
import { useAuthStore } from '@/modules/auth/store/auth.store';

export function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  async function signIn(email: string, password: string) {
    await authApi.login({ email, password });

    const user = await authApi.me();

    setUser(user);

    router.push('/dashboard');
  }

  return {
    signIn,
  };
}