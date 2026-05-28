import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { Request } from 'express';

import type { JwtUser } from '@/shared/types/auth/jwt-user.type';
import { RequestContextService } from '@/shared/services/request-context.service';

type RequestWithCookies = Request & {
  cookies: {
    access_token?: string;
  };
};

function cookieExtractor(req: Request): string | null {
  const request = req as RequestWithCookies;

  return request.cookies.access_token ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,

    private readonly context: RequestContextService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtUser): JwtUser {
    const user = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      permissions: payload.permissions,
    };

    this.context.setUser(user);

    return user;
  }
}
