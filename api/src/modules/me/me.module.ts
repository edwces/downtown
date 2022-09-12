import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { MeController } from './me.controller';

@Module({
  imports: [CartModule],
  controllers: [MeController],
})
export class MeModule {}
