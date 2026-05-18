import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { JwtUser } from '@/shared/interfaces/jwt-user.interface';

type RequestWithUser = Request & {
  user: JwtUser;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
