import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'carts' })
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
