import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Customer } from '../../modules/customer/customer.entity';

export class CustomerSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const customer1 = Customer.create({
      email: 'hello@wp',
      password: 'password',
      name: 'Bob',
      surname: 'Man',
    });

    const customer2 = Customer.create({
      email: 'good@wp',
      password: 'goodday',
      name: 'Tom',
      surname: 'View',
    });

    em.persist([customer1, customer2]);
  }
}
