import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../../modules/product/product.entity';
import { Customer } from '../../modules/customer/customer.entity';
import { Cart } from '../../../src/modules/cart/entities/cart.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const cart = Cart.create();
    const customer = await Customer.create({
      email: 'hello@wp.pl',
      password: 'password',
      name: 'Bob',
      surname: 'Man',
      cart,
    });

    const product = Product.create({
      label: 'T-shirt',
      price: 19.99,
    });

    em.persist([customer, product]);
  }
}
