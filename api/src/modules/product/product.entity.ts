import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Basic } from '../../common/basic.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

@Entity()
export class Product extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @Unique()
  @Property()
  label!: string;

  @Property({ columnType: 'decimal(12, 2)' })
  price!: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  inCarts = new Collection<CartItem>(this);
}
