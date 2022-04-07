import { Factory, Faker } from '@mikro-orm/seeder';
import { Cart } from '../../entities/cart/cart.entity';

export class CartFactory extends Factory<Cart> {
  model = Cart;

  protected definition(faker: Faker): Partial<Cart> {
    return {};
  }
}
