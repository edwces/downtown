import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../../modules/product/product.entity';
import { Customer } from '../../modules/customer/customer.entity';
import { Cart } from '../../../src/modules/cart/entities/cart.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const customer = em.create(Customer, {
      email: 'hello@wp.pl',
      password: 'password',
      name: 'Bob',
      surname: 'Man',
    });
    customer.setPassword('password');

    const cart = em.create(Cart, { owner: customer });

    const product = em.create(Product, {
      label: 'T-shirt',
      price: 19.99,
    });
    const product2 = em.create(Product, {
      label: 'irt',
      price: 14.99,
    });
    const product3 = em.create(Product, {
      label: 'shirt',
      price: 219.99,
    });

    em.persist([customer, product, cart, product2, product3]);
  }
}
