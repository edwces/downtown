import { Body, Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerRequestDTO } from './request/create-customer.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'customers' })
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() data: CreateCustomerRequestDTO) {
    return this.customerService.create(data);
  }
}
