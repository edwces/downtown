import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/common/interfaces/environment-variables.interface';
import { JWTAccessPayload } from '../auth.types';
import { AuthStrategies } from '../enums/auth-strategies';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.JWT_ACCESS,
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JWTAccessPayload) {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }
}
