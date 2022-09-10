import { Controller, VERSION_NEUTRAL, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemRequestDTO } from './request/create-cart-item.request.dto';
import { RemoveCartItemRequestDTO } from './request/remove-cart-item.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'carts' })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Put('items/add')
  addProductToCart(data: CreateCartItemRequestDTO) {
    return this.cartService.addProductToCartByOwner(data);
  }

  @Put('items/remove')
  removeProductFromCart(data: RemoveCartItemRequestDTO) {
    return this.cartService.removeProductFromCartByOwner(data);
  }
}
