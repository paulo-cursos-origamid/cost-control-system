import { Permission } from '../types/enums/permissions.enum';

export interface JwtUser {
  sub: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  permissions: Permission[];
}
