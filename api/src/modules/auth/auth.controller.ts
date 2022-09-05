import {
  Controller,
  VERSION_NEUTRAL,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JWT_REFRESH_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { SignInCustomerRequestDTO } from './request/sign-in-customer.request.dto';
import { SignUpCustomerRequestDTO } from './request/sign-up-customer.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() data: SignUpCustomerRequestDTO) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: SignInCustomerRequestDTO) {
    return this.authService.signIn(data);
  }

  @Post('sign-out')
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  signOut(@Res() response: Response) {
    response.clearCookie(JWT_REFRESH_COOKIE_NAME);
  }
}
