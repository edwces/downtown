import { Injectable } from '@nestjs/common';
import { SignInCustomerRequestDTO } from './request/sign-in-customer.request.dto';
import { SignUpCustomerRequestDTO } from './request/sign-up-customer.request.dto';

@Injectable()
export class AuthService {
  signUp(data: SignUpCustomerRequestDTO) {}

  signIn(data: SignInCustomerRequestDTO) {}
}
