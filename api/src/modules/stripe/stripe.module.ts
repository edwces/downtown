import {
  DynamicModule,
  Global,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
import Stripe from 'stripe';

interface StripeModuleOptions {
  secret: string;
}

interface StripeAsyncModuleOptions {
  inject: (InjectionToken | OptionalFactoryDependency)[];
  useFactory: (
    ...args: any[]
  ) => Promise<StripeModuleOptions> | StripeModuleOptions;
}

export const STRIPE_API_KEY = 'STRIPE_API_KEY';

@Global()
@Module({})
export class StripeModule {
  static forRoot({ secret }: StripeModuleOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        {
          provide: STRIPE_API_KEY,
          useValue: new Stripe(secret, { apiVersion: null }),
        },
      ],
      exports: [STRIPE_API_KEY],
    };
  }

  static forRootAsync({
    inject,
    useFactory,
  }: StripeAsyncModuleOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        {
          provide: STRIPE_API_KEY,
          inject,
          useFactory: async (...args) => {
            return new Stripe((await useFactory(...args)).secret, {
              apiVersion: null,
            });
          },
        },
      ],
      exports: [STRIPE_API_KEY],
    };
  }
}
