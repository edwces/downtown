import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import { CloudinaryModule } from './common/providers/cloudinary/cloudinary.module';
import { StripeModule } from './common/providers/stripe/stripe.module';
import mikroOrmConfig from './config/mikro-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MeModule } from './modules/me/me.module';
import { ProductModule } from './modules/product/product.module';

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
    CloudinaryModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return {
          secret: configService.get('CLOUDINARY_API_SECRET'),
          key: configService.get('CLOUDINARY_API_KEY'),
          name: configService.get('CLOUDINARY_API_NAME'),
        };
      },
    }),
    CustomerModule,
    ProductModule,
    CartModule,
    AuthModule,
    CheckoutModule,
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
