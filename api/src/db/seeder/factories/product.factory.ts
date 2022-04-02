import { Factory, Faker } from '@mikro-orm/seeder';
import { Product } from '../../entities/product/product.entity';

export class ProductFactory extends Factory<Product> {
  model = Product;

  protected definition(faker: Faker): Partial<Product> {
    return {
      name: faker.commerce.productName(),
      price: Number.parseFloat(faker.commerce.price(10, 100)),
      image: faker.image.fashion(640, 480, true),
    };
  }
}
