import {
  Entity,
  EntityDTO,
  Enum,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import * as argon2 from 'argon2';
import { Basic } from '../../common/basic.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CustomerRoles } from './enums/customer-roles.enum';

@Entity()
export class Customer extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @Unique()
  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  name!: string;

  @Property()
  surname!: string;

  @Enum(() => CustomerRoles)
  role: CustomerRoles = CustomerRoles.USER;

  @OneToOne({ entity: () => Cart, owner: true, nullable: true })
  cart?: Cart;

  promote() {
    this.role = CustomerRoles.ADMIN;
  }

  async setPassword(plain: string) {
    this.password = await argon2.hash(plain);
  }

  verify(plain: string) {
    return argon2.verify(this.password, plain);
  }
}
