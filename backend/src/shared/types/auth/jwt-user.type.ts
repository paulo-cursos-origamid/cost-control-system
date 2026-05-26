import { Role } from '../enums/role.enum';

export type JwtUser = {
  sub: string;
  email: string;
  role: Role;
};
