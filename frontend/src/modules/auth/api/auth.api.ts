import { apiFetch } from '@/lib/api';

export interface LoginDTO {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginDTO) =>
    apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () =>
    apiFetch('/api/auth/me', {
      method: 'GET',
    }),

  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),
};