import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permissions.enum';

export type JwtUser = {
  sub: string;
  email: string;
  role: Role;
  permissions: Permission[];
};
