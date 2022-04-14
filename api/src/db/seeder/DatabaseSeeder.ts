import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductCategory } from '../entities/product/product-category.entity';
import { ProductCategoryFactory } from './factories/product-category.factory';
import { ProductFactory } from './factories/product.factory';
import faker from '@faker-js/faker';
import { UserFactory } from './factories/user.factory';
import { CartFactory } from './factories/cart.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const categories: ProductCategory[] = new ProductCategoryFactory(em).make(
      5
    );
    const userFactory = new UserFactory(em);
    const productFactory = new ProductFactory(em);
    const cartFactory = new CartFactory(em);

    const products = productFactory
      .each((product) => {
        product.category = faker.random.arrayElement(categories);
      })
      .make(30);

    cartFactory
      .each((cart) => {
        cart.user = userFactory.makeOne();
        const shuffledProducts = products.sort((a, b) => 0.5 - Math.random());
        cart.products.set(shuffledProducts.slice(0, 3));
      })
      .make(30);
  }
}
