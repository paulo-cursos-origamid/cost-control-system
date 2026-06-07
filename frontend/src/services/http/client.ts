import { env } from '@/configs/env';

import { HttpError } from '@/services/http/errors';

import { RequestConfig } from '@/services/http/types';

export async function httpClient<T>(
  endpoint: string,

  config?: RequestConfig,
): Promise<T> {
  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...config,

    credentials: 'include',

    headers: {
      'Content-Type': 'application/json',

      ...(config?.headers || {}),
    },
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw new HttpError(
      'Request failed',
      response.status,
      data,
    );
  }

  return data as T;
}
