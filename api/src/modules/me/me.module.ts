import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { MeController } from './me.controller';

@Module({
  imports: [CartModule, CheckoutModule],
  controllers: [MeController],
})
export class MeModule {}
