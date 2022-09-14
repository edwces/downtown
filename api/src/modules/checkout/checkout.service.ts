import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/interfaces/environment-variables.interface';
import Stripe from 'stripe';
import { Product } from '../product/product.entity';
import { InjectStripe } from '../stripe/inject-stripe.decorator';

interface CheckoutItem {
  product: Product;
  quantity: number;
}

@Injectable()
export class CheckoutService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  // TODO: Enforce a better interface because this method
  // is used both with CartItem and Transformed DTO's
  async createSession(lineItems: CheckoutItem[]) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems.map((item) => {
        return {
          price_data: {
            currency: 'USD',
            unit_amount: Math.ceil(item.product.price * 100),
            product_data: {
              name: item.product.label,
            },
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: this.configService.get('WEB_FRONTEND_URL'),
      cancel_url: this.configService.get('WEB_FRONTEND_URL'),
    });
    return session;
  }
}
