import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  wrap,
} from '@mikro-orm/core';
import { Basic } from '../../../common/basic.entity';
import { Product } from '../../../modules/product/product.entity';
import { Cart } from './cart.entity';

type CartItemProps = {
  product: Product | number;
  cart: Cart | number;
};

@Entity()
@Unique({ properties: ['product', 'cart'] })
export class CartItem extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity: number = 1;

  @ManyToOne(() => Cart)
  cart!: Cart;

  static create({ product, cart }: CartItemProps) {
    const cartItem = new CartItem();
    wrap(cartItem).assign({ product, cart });
    return cartItem;
  }

  incrementQuantity() {
    this.quantity += 1;
  }

  decrementQuantity() {
    if (this.quantity === 1)
      throw new Error("Cart item can't be decremented to 0");
    this.quantity -= 1;
  }
}
