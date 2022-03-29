import { Factory, Faker } from '@mikro-orm/seeder';
import { ProductImage } from '../../entities/product/product-image.entity';

export class ProductImageFactory extends Factory<ProductImage> {
  model = ProductImage;

  protected definition(faker: Faker): Partial<ProductImage> {
    return {
      url: faker.image.fashion(),
    };
  }
}
