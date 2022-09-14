import { Controller, VERSION_NEUTRAL, Post, Body } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutSessionDTO } from './request/create-checkout-session.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'checkout' })
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createSession(@Body() data: CreateCheckoutSessionDTO) {
    const ids = data.items.map((item) => item.id);
    const products = await this.productService.findAll({
      ids,
    });
    const items = data.items.map((item) => ({
      product: products.find((product) => product.id === item.id),
      quantity: item.quantity,
    }));
    const session = await this.checkoutService.createSession(items);
    return { url: session.url };
  }
}
