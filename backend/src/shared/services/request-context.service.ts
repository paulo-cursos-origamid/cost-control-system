import { Injectable } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import { CLS_KEYS } from '@/shared/constants/cls.constants';
import { JwtUser } from '../types/auth/jwt-user.type';

@Injectable()
export class RequestContextService {
  constructor(private readonly cls: ClsService) {}

  getUserId(): string | undefined {
    return this.cls.get(CLS_KEYS.USER_ID);
  }

  getEmail(): string | undefined {
    return this.cls.get(CLS_KEYS.EMAIL);
  }

  getRequestId(): string | undefined {
    return this.cls.get(CLS_KEYS.REQUEST_ID);
  }

  getIp(): string | undefined {
    return this.cls.get(CLS_KEYS.IP);
  }

  getUserAgent(): string | undefined {
    return this.cls.get(CLS_KEYS.USER_AGENT);
  }

  setUser(user: JwtUser) {
    this.cls.set(CLS_KEYS.USER_ID, user.sub);

    this.cls.set(CLS_KEYS.EMAIL, user.email);

    this.cls.set('user', user);
  }
  setRequestId(requestId: string) {
    this.cls.set(CLS_KEYS.REQUEST_ID, requestId);
  }

  setIp(ip: string) {
    this.cls.set(CLS_KEYS.IP, ip);
  }

  setUserAgent(userAgent: string) {
    this.cls.set(CLS_KEYS.USER_AGENT, userAgent);
  }
}
