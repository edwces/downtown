import { Entity, EntityDTO, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import * as argon2 from 'argon2';
import { Basic } from '../../common/basic.entity';
import { CustomerRoles } from './enums/customer-roles.enum';

type CustomerProps = Pick<EntityDTO<Customer>, 'email' | 'password'>;

@Entity()
export class Customer extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Enum(() => CustomerRoles)
  role: CustomerRoles = CustomerRoles.USER;

  static async create(data: CustomerProps) {
    const customer = new Customer();
    customer.email = data.email;
    customer.password = await argon2.hash(data.password);
    return customer;
  }

  promote() {
    this.role = CustomerRoles.ADMIN;
  }
}
