import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { Customer } from '../../../modules/customer/customer.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryKey()
  readonly id!: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items = new Collection<CartItem>(this);

  @OneToOne(() => Customer)
  owner: Customer;

  static create() {
    const cart = new Cart();
    return cart;
  }
}
