import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import mikroOrmConfig from './config/mikro-orm.config';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    CustomerModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
