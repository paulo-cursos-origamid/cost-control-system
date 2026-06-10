import { User } from '@/modules/users/types/user.types'
export interface LoginPayload {
  email: string;

  password: string;
}

export interface LoginResponse {
  accessToken: string;

  user: User;
}
