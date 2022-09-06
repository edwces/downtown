import { Entity, EntityDTO, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import * as argon2 from 'argon2';
import { Basic } from '../../common/basic.entity';
import { CustomerRoles } from './enums/customer-roles.enum';

type CustomerProps = Omit<
  EntityDTO<Customer>,
  'role' | 'id' | 'createdAt' | 'updatedAt'
>;

@Entity()
export class Customer extends Basic {
  @PrimaryKey()
  readonly id!: number;

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

  static async create(data: CustomerProps) {
    const customer = new Customer();
    customer.email = data.email;
    customer.password = await argon2.hash(data.password);
    customer.name = data.name;
    customer.surname = data.surname;
    return customer;
  }

  promote() {
    this.role = CustomerRoles.ADMIN;
  }

  verify(plain: string) {
    return argon2.verify(this.password, plain);
  }
}
