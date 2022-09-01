import { Controller, Get } from '@nestjs/common';

@Controller()
export class CustomerController {
  @Get('/')
  findAll() {
    return [];
  }
}
