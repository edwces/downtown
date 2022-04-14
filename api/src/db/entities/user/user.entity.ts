import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Cart } from '../cart/cart.entity';
import { CustomBaseEntity } from '../common/base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @OneToOne(() => Cart)
  cart!: Cart;
}
