import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductCategory } from '../entities/product/product-category.entity';
import { ProductCategoryFactory } from './factories/product-category.factory';
import { ProductFactory } from './factories/product.factory';
import faker from '@faker-js/faker';
import { Product } from '../entities/product/product.entity';
import { ProductImageFactory } from './factories/product-image.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const categories: ProductCategory[] = new ProductCategoryFactory(em).make(
      5
    );

    const products: Product[] = new ProductFactory(em)
      .each((product) => {
        product.category = faker.random.arrayElement(categories);

        let imageIndex = 0;
        product.images.set(
          new ProductImageFactory(em)
            .each((image) => {
              image.index = imageIndex;
              imageIndex += 1;
            })
            .make(4)
        );
      })
      .make(30);
  }
}
