import { Factory, Faker } from '@mikro-orm/seeder';
import { ProductCategory } from '../../entities/product/product-category.entity';

export class ProductCategoryFactory extends Factory<ProductCategory> {
  model = ProductCategory;

  protected definition(faker: Faker): Partial<ProductCategory> {
    return {
      name: faker.commerce.department(),
    };
  }
}
