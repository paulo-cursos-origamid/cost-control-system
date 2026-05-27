import { Permission } from '@/shared/types/enums/permissions.enum';
import { Role } from '@/shared/types/enums/role.enum';

export const rolePermissions: Record<Role, Permission[]> = {
  ADMIN: [
    Permission.USERS_READ,
    Permission.USERS_CREATE,
    Permission.USERS_UPDATE,
    Permission.USERS_DELETE,
  ],

  MANAGER: [Permission.USERS_READ],

  USER: [],
};
