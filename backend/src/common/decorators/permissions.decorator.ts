import { SetMetadata } from '@nestjs/common';

import { Permission } from '../../shared/types/enums/permissions.enum';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
