import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { randomUUID } from 'crypto';

import { RequestContextService } from '@/shared/services/request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContextService) {}

  use(req: Request, _: Response, next: NextFunction) {
    this.context.setRequestId(randomUUID());

    next();
  }
}
