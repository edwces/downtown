import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import mikroOrmConfig from './config/mikro-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MeModule } from './modules/me/me.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    ProductModule,
    CartModule,
    AuthModule,
    MeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
