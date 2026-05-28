import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class EntityDiffInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      params?: {
        id?: string;
      };

      auditContext?: {
        before?: unknown;
        after?: unknown;
        diff?: unknown;
      };
    }>();

    const entityId = request.params?.id;

    if (!entityId) {
      return next.handle();
    }

    return next.handle().pipe(
      map((response: unknown) => {
        request.auditContext = {
          before: null,
          after: response,
          diff: null,
        };

        return response;
      }),
    );
  }
}
