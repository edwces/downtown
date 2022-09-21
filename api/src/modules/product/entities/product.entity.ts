import {
  Collection,
  Embedded,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Basic } from '../../../common/basic.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { ProductImage } from './product-image';

@Entity()
export class Product extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @Unique()
  @Property()
  label!: string;

  @Property({ columnType: 'decimal(12, 2)' })
  price!: number;

  @Embedded(() => ProductImage)
  image!: ProductImage;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  inCarts = new Collection<CartItem>(this);
}
