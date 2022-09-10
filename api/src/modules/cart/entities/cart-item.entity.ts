import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Basic } from '../../../common/basic.entity';
import { Product } from '../../../modules/product/product.entity';
import { Cart } from './cart.entity';

@Entity()
@Unique({ properties: ['product', 'cart'] })
export class CartItem extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @ManyToOne()
  product!: Product;

  @Property()
  quantity!: number = 1;

  @ManyToOne(() => Cart)
  cart!: Cart;
}
