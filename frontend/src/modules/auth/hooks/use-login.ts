'use client';

import { useRouter } from 'next/navigation';

import {
  login,
  getMe,
} from '@/modules/auth/services/auth.service';

import { useAuthStore } from '@/modules/auth/store/auth.store';

export function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  async function signIn(
    email: string,
    password: string,
  ) {
    await login({
      email,
      password,
    });

    const user = await getMe();

    setUser(user);

    router.push('/dashboard');
  }

  return {
    signIn,
  };
}
