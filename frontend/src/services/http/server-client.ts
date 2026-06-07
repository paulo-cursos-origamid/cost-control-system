import { cookies } from 'next/headers';

import { env } from '@/configs/env';

export async function serverClient<T>(
  endpoint: string,

  config?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...config,

    headers: {
      Cookie: cookieStore.toString(),

      'Content-Type': 'application/json',

      ...(config?.headers || {}),
    },

    credentials: 'include',

    cache: 'no-store',
  });

  return response.json();
}
