import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { Observable, tap } from 'rxjs';

import { AuditService } from '@/modules/audit/audit.service';

import { AUDIT_KEY, AuditMetadata } from '@/common/decorators/audit.decorator';

import type { JwtUser } from '@/shared/types/auth/jwt-user.type';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const audit = this.reflector.get<AuditMetadata>(
      AUDIT_KEY,
      context.getHandler(),
    );

    if (!audit) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<{
      user?: JwtUser;

      method: string;

      originalUrl?: string;

      route?: {
        path?: string;
      };

      ip?: string;

      body?: unknown;

      params?: unknown;

      query?: unknown;
    }>();

    return next.handle().pipe(
      tap(() => {
        void this.auditService.register({
          userId: request.user?.sub,

          userEmail: request.user?.email,

          action: audit.action,

          entity: audit.entity,

          method: request.method,

          route: request.originalUrl ?? request.route?.path ?? '',

          ipAddress: request.ip,

          metadata: {
            body: request.body,

            params: request.params,

            query: request.query,
          },
        });
      }),
    );
  }
}
