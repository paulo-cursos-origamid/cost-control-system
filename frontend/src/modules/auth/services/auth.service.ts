import { httpClient } from '@/services/http/client';

import { User } from '@/modules/users/types/user.types';

import {
  LoginPayload,
  LoginResponse,
} from '@/modules/auth/types/login.types';

export async function login(
  payload: LoginPayload,
): Promise<LoginResponse> {
  return httpClient<LoginResponse>(
    '/api/auth/login',
    {
      method: 'POST',

      body: JSON.stringify(payload),
    },
  );
}

export async function getMe(): Promise<User | null> {
  try {
    return await httpClient<User>(
      '/api/auth/me',
    );
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await httpClient(
    '/api/auth/logout',
    {
      method: 'POST',
    },
  );
}
