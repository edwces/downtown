import {
  Collection,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Cart extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, (user) => user.cart)
  user!: User;

  @ManyToMany(() => Product)
  products = new Collection<Product>(this);
}
