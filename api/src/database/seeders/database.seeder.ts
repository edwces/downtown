import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../../modules/product/product.entity';
import { Customer } from '../../modules/customer/customer.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const customer = await Customer.create({
      email: 'hello@wp.pl',
      password: 'password',
      name: 'Bob',
      surname: 'Man',
    });

    const product = Product.create({
      label: 'T-shirt',
    });

    em.persist([customer, product]);
  }
}
