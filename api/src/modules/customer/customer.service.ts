import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Cart } from '../cart/entities/cart.entity';
import { Customer } from './customer.entity';
import { CreateCustomerRequestDTO } from './request/create-customer.request.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    @InjectRepository(Cart)
    private readonly cartRepository: EntityRepository<Cart>,
  ) {}

  findAll() {
    return this.customerRepository.findAll();
  }

  async create(data: CreateCustomerRequestDTO) {
    const customer = this.customerRepository.create(data);
    await customer.setPassword(data.password);
    const cart = this.cartRepository.create({ owner: customer });
    await this.customerRepository.persistAndFlush([customer, cart]);
  }
}
