import { Factory, Faker } from '@mikro-orm/seeder';
import { CartItem } from '../../entities/cart/cartItem.entity';

export default class CartItemFactory extends Factory<CartItem> {
  model = CartItem;

  protected definition(faker: Faker): Partial<CartItem> {
    return {
      quantity: faker.datatype.number({ min: 1, max: 10 }),
    };
  }
}
