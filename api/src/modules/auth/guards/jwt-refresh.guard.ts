import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from '../enums/auth-strategies';

@Injectable()
export class JWTRefreshGuard extends AuthGuard(AuthStrategies.JWT_REFRESH) {}
