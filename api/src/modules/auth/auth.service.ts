import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/common/interfaces/environment-variables.interface';
import { Cart } from '../cart/entities/cart.entity';
import { Customer } from '../customer/customer.entity';
import { SignInRequestDTO } from './request/sign-in.request.dto';
import { SignUpRequestDTO } from './request/sign-up.request.dto';

const JWT_ACCESS_EXPIRE_TIME = 1000 * 60 * 10;
const JWT_REFRESH_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async signUp(data: SignUpRequestDTO) {
    const cart = new Cart();
    const customer = await Customer.create({ ...data, cart });
    await this.customerRepository.persistAndFlush(customer);
  }

  async signIn(data: SignInRequestDTO) {
    const customer = await this.customerRepository.findOne({
      email: data.email,
    });
    if (!customer) {
      throw new UnauthorizedException('Email is not correct');
    }
    const isPasswordCorrect = await customer.verify(data.password);
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Password is not correct');
    return customer;
  }

  async refresh(id: number) {
    return await this.customerRepository.findOneOrFail(id);
  }

  async createAccessToken(customer: Customer) {
    return this.jwtService.signAsync(
      { id: customer.id, email: customer.email, name: customer.name },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: JWT_ACCESS_EXPIRE_TIME,
      },
    );
  }

  async createRefreshToken(customer: Customer) {
    return this.jwtService.signAsync(
      { id: customer.id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: JWT_REFRESH_EXPIRE_TIME,
      },
    );
  }
}
