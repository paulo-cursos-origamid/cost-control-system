import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import type { Request, Response } from 'express';

interface ErrorResponse {
  success: false;
  statusCode: number;
  path: string;
  method: string;
  message: string | object;
  timestamp: string;
  requestId?: string;
  correlationId?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly cls: ClsService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse: ErrorResponse = {
      success: false,

      statusCode: status,

      path: request.url,

      method: request.method,

      message,

      timestamp: new Date().toISOString(),

      requestId: this.cls.get<string>('requestId'),

      correlationId: this.cls.get<string>('correlationId'),
    };

    response.status(status).json(errorResponse);
  }
}
