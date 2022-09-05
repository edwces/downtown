import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JWTAccessStrategy } from './strategies/jwt-access.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JWTAccessGuard } from './guards/jwt-access.guard';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from '../customer/customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer]), PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTAccessStrategy,
    JWTRefreshStrategy,
    JWTAccessGuard,
    JWTRefreshGuard,
  ],
})
export class AuthModule {}