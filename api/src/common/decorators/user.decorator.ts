import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JWTUser } from 'src/modules/auth/auth.types';

type AuthenticatedRequest = Request & { user: JWTUser };

export const User = createParamDecorator(
  (data: keyof JWTUser, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return data ? user[data] : user;
  },
);
