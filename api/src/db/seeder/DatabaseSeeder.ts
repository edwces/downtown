import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductCategory } from '../entities/product/product-category.entity';
import { ProductCategoryFactory } from './factories/product-category.factory';
import { ProductFactory } from './factories/product.factory';
import faker from '@faker-js/faker';
import { UserFactory } from './factories/user.factory';
import { CartFactory } from './factories/cart.factory';
import CartItemFactory from './factories/cartItem.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // create 5 categories of products
    const categories: ProductCategory[] = new ProductCategoryFactory(em).make(
      5
    );

    const userFactory = new UserFactory(em);
    const productFactory = new ProductFactory(em);
    const cartFactory = new CartFactory(em);
    const cartItemFactory = new CartItemFactory(em);

    const products = productFactory
      .each((product) => {
        product.category = faker.random.arrayElement(categories);
      })
      .make(30);

    // 1.each user create a cart
    // 2.each cart create 3 cartItems for that cart
    // 3. random products for each one of them
    userFactory
      .each((user) => {
        cartFactory
          .each((cart) => {
            user.cart = cart;
            cart.user = user;
            cartItemFactory
              .each((cartItem) => {
                cartItem.cart = cart;
                const shuffledProducts = products.sort(
                  (a, b) => 0.5 - Math.random()
                );
                cartItem.product = shuffledProducts[0];
                cart.items.add(cartItem);
              })
              .make(3);
          })
          .makeOne();
      })
      .make(30);
  }
}
