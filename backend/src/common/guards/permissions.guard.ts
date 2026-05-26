import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

import { JwtUser } from '@/modules/auth/types/jwt-user.interface';

import { Permission } from '../enums/permissions.enum';

@Injectable()
export class PermissionsGuard
  implements CanActivate
{
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredPermissions =
      this.reflector.getAllAndOverride<
        Permission[]
      >(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user: JwtUser }>();

    const user = request.user;

    return requiredPermissions.every(
      (permission) =>
        user.permissions.includes(permission),
    );
  }
}