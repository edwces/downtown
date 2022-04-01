import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductCategory } from '../entities/product/product-category.entity';
import { ProductCategoryFactory } from './factories/product-category.factory';
import { ProductFactory } from './factories/product.factory';
import faker from '@faker-js/faker';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const categories: ProductCategory[] = new ProductCategoryFactory(em).make(
      5
    );

    new ProductFactory(em)
      .each((product) => {
        product.category = faker.random.arrayElement(categories);
      })
      .make(30);
  }
}
