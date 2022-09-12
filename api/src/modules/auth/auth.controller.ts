import {
  Controller,
  VERSION_NEUTRAL,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  UseGuards,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../common/decorators/user.decorator';
import { JWT_REFRESH_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { SignInRequestDTO } from './request/sign-in.request.dto';
import { SignUpRequestDTO } from './request/sign-up.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() data: SignUpRequestDTO) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() data: SignInRequestDTO,
  ) {
    const customer = await this.authService.signIn(data);
    const accessToken = await this.authService.createAccessToken(customer);
    const refreshToken = await this.authService.createRefreshToken(customer);

    response.cookie(JWT_REFRESH_COOKIE_NAME, refreshToken, { httpOnly: true });
    return { customer, token: accessToken };
  }

  @Post('sign-out')
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(JWT_REFRESH_COOKIE_NAME);
  }

  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@User('id', ParseIntPipe) id: number) {
    const customer = await this.authService.refresh(id);
    const accessToken = await this.authService.createAccessToken(customer);

    return { customer, token: accessToken };
  }
}
