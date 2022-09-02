import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CreateCustomerRequestDTO } from './request/create-customer.request.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
  ) {}

  findAll() {
    return this.customerRepository.findAll();
  }

  async create(data: CreateCustomerRequestDTO) {
    const customer = await Customer.create(data);
    await this.customerRepository.persistAndFlush(customer);
  }
}
