import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import mikroOrmConfig from './config/mikro-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MeModule } from './modules/me/me.module';
import { ProductModule } from './modules/product/product.module';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return { secret: configService.get('STRIPE_PRIVATE_KEY') };
      },
    }),
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
