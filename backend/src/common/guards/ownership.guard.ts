import { JwtUser } from '@/modules/auth/types/jwt-user.type';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// import { JwtUser } from '@/modules/auth/types/jwt-user.interface';]

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user: JwtUser;
      params: { userId?: string };
    }>();

    const user = request.user;

    const resourceUserId = request.params.userId;

    return user.role === 'ADMIN' || user.sub === resourceUserId;
  }
}
