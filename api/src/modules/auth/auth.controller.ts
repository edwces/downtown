import {
  Controller,
  VERSION_NEUTRAL,
  Post,
  HttpCode,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCustomerRequestDTO } from './request/sign-in-customer.request.dto';
import { SignUpCustomerRequestDTO } from './request/sign-up-customer.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() data: SignUpCustomerRequestDTO) {
    return this.authService.signUp(data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: SignInCustomerRequestDTO) {
    return this.authService.signIn(data);
  }
}
