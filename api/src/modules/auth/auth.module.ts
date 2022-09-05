import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JWTAccessStrategy, JWTRefreshStrategy],
})
export class AuthModule {}
