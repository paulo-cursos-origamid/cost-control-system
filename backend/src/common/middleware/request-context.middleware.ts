import { Injectable, NestMiddleware } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import { randomUUID } from 'crypto';

import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id']?.toString() ?? randomUUID();

    const correlationId =
      req.headers['x-correlation-id']?.toString() ?? randomUUID();

    this.cls.set('requestId', requestId);
    this.cls.set('correlationId', correlationId);

    next();
  }
}
