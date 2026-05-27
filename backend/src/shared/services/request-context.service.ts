import { Injectable } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import type { JwtUser } from '@/shared/types/auth/jwt-user.type';

@Injectable()
export class RequestContextService {
  constructor(private readonly cls: ClsService) {}

  getRequestId(): string | undefined {
    return this.cls.get<string>('requestId');
  }

  getCorrelationId(): string | undefined {
    return this.cls.get<string>('correlationId');
  }

  getUser(): JwtUser | undefined {
    return this.cls.get<JwtUser>('user');
  }

  getIpAddress(): string | undefined {
    return this.cls.get<string>('ipAddress');
  }
}
