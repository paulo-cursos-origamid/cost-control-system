import { Role } from '@prisma/client';

import { Permission } from '@/common/enums/permissions.enum';

export const rolePermissions: Record<
  Role,
  Permission[]
> = {
  ADMIN: Object.values(Permission),

  USER: [
    Permission.TRANSACTIONS_READ,
    Permission.TRANSACTIONS_CREATE,
  ],
};