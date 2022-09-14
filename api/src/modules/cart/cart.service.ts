import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { CreateCartItemRequestDTO } from './request/create-cart-item.request.dto';
import { RemoveCartItemRequestDTO } from './request/remove-cart-item.request.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: EntityRepository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: EntityRepository<CartItem>,
  ) {}

  findOneByOwner(ownerId: number) {
    return this.cartRepository.findOne(
      { owner: ownerId },
      { populate: ['items', 'items.product'] },
    );
  }

  private findOneItemByOwnerAndProduct(ownerId: number, productId: number) {
    return this.cartItemRepository.findOne({
      cart: { owner: ownerId },
      product: productId,
    });
  }

  async addProductToCartByOwner(data: CreateCartItemRequestDTO) {
    const itemAlreadyInCart = await this.findOneItemByOwnerAndProduct(
      data.ownerId,
      data.productId,
    );

    if (!itemAlreadyInCart) {
      const cart = await this.cartRepository.findOneOrFail({
        owner: data.ownerId,
      });
      const item = this.cartItemRepository.create({
        product: data.productId,
        cart,
      });
      return await this.cartItemRepository.persistAndFlush(item);
    }

    itemAlreadyInCart.incrementQuantity();
    await this.cartItemRepository.flush();
  }

  async removeProductFromCartByOwner(data: RemoveCartItemRequestDTO) {
    const itemAlreadyInCart = await this.findOneItemByOwnerAndProduct(
      data.ownerId,
      data.productId,
    );

    if (!itemAlreadyInCart)
      throw new BadRequestException('Product is not in cart');

    if (itemAlreadyInCart.quantity === 1)
      return await this.cartItemRepository.removeAndFlush(itemAlreadyInCart);

    itemAlreadyInCart.decrementQuantity();
    await this.cartItemRepository.flush();
  }
}
