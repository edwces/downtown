import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { User } from '../user/user.entity';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, (user) => user.cart)
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items = new Collection<CartItem>(this);
}
