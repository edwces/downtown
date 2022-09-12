import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategies } from '../enums/auth-strategies';

@Injectable()
export class JWTAccessGuard extends AuthGuard(AuthStrategies.JWT_ACCESS) {}
