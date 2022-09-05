import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { EnvironmentVariables } from '../../../common/interfaces/environment-variables.interface';
import { JWT_REFRESH_COOKIE_NAME } from '../auth.constants';
import { JWTRefreshPayload } from '../auth.types';
import { AuthStrategies } from '../enums/auth-strategies';

const jwtCookieExtractor = (request: Request) => {
  if (request.cookies && request.cookies[JWT_REFRESH_COOKIE_NAME])
    return request.cookies[JWT_REFRESH_COOKIE_NAME];
  return null;
};

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.JWT_REFRESH,
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: jwtCookieExtractor,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: JWTRefreshPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
