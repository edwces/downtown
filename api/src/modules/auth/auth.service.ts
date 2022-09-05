import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer/customer.entity';
import { SignInCustomerRequestDTO } from './request/sign-in-customer.request.dto';
import { SignUpCustomerRequestDTO } from './request/sign-up-customer.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpCustomerRequestDTO) {
    const customer = Customer.create(data);
    await this.customerRepository.persistAndFlush(customer);
  }

  async signIn(data: SignInCustomerRequestDTO) {}
}
