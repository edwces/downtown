import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Cart } from '../cart/entities/cart.entity';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Module({
  imports: [MikroOrmModule.forFeature([Customer, Cart])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
