import {
  Controller,
  Put,
  Get,
  UseGuards,
  ParseIntPipe,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { CartService } from '../cart/cart.service';
import { CreateMyCartItemRequestDTO } from './request/create-my-cart-item.request.dto';
import { RemoveMyCartItemRequestDTO } from './request/remove-my-cart-item.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'me' })
@UseGuards(JWTAccessGuard)
export class MeController {
  constructor(private readonly cartService: CartService) {}

  @Put('cart/add-item')
  addProductToMyCart(
    @User('id', ParseIntPipe) id: number,
    data: CreateMyCartItemRequestDTO,
  ) {
    return this.cartService.addProductToCartByOwner({
      ownerId: id,
      productId: data.productId,
    });
  }

  @Put('cart/remove-item')
  removeProductFromMyCart(
    @User('id', ParseIntPipe) id: number,
    data: RemoveMyCartItemRequestDTO,
  ) {
    return this.cartService.removeProductFromCartByOwner({
      ownerId: id,
      productId: data.productId,
    });
  }

  @Get('cart')
  findMyCart(@User('id', ParseIntPipe) id: number) {
    return this.cartService.findOneByOwner(id);
  }
}
