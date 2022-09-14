import {
  Controller,
  Put,
  Get,
  UseGuards,
  ParseIntPipe,
  VERSION_NEUTRAL,
  Post,
  Body,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JWTAccessGuard } from '../auth/guards/jwt-access.guard';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from '../checkout/checkout.service';
import { CreateMyCartItemRequestDTO } from './request/create-my-cart-item.request.dto';
import { RemoveMyCartItemRequestDTO } from './request/remove-my-cart-item.request.dto';

@Controller({ version: [VERSION_NEUTRAL, '1'], path: 'me' })
@UseGuards(JWTAccessGuard)
export class MeController {
  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
  ) {}

  @Put('cart/add-product')
  addProductToMyCart(
    @User('id', ParseIntPipe) id: number,
    @Body() data: CreateMyCartItemRequestDTO,
  ) {
    return this.cartService.addProductToCartByOwner({
      ownerId: id,
      productId: data.productId,
    });
  }

  @Put('cart/remove-product')
  removeProductFromMyCart(
    @User('id', ParseIntPipe) id: number,
    @Body() data: RemoveMyCartItemRequestDTO,
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

  @Post('cart/checkout')
  async createSessionFromMyCart(@User('id', ParseIntPipe) id: number) {
    const cart = await this.cartService.findOneByOwner(id);
    const session = await this.checkoutService.createSession(
      cart.items.getItems(),
    );
    return { url: session.url };
  }
}
