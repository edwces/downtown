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

type CustomerProps = Omit<
  EntityDTO<Customer>,
  'role' | 'id' | 'createdAt' | 'updatedAt' | 'cart'
> & { cart: Cart };

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

  @OneToOne({ entity: () => Cart, owner: true })
  cart!: Cart;

  static async create(data: CustomerProps) {
    const customer = new Customer();
    customer.email = data.email;
    customer.password = await argon2.hash(data.password);
    customer.name = data.name;
    customer.surname = data.surname;
    customer.cart = data.cart;
    return customer;
  }

  promote() {
    this.role = CustomerRoles.ADMIN;
  }

  verify(plain: string) {
    return argon2.verify(this.password, plain);
  }
}
