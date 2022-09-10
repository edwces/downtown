import {
  Collection,
  Entity,
  EntityDTO,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Basic } from '../../common/basic.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

type ProductProps = Pick<EntityDTO<Product>, 'label'>;

@Entity()
export class Product extends Basic {
  @PrimaryKey()
  readonly id!: number;

  @Unique()
  @Property()
  label!: string;

  @Property({ columnType: 'decimal(12, 2)' })
  price!: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  inCarts = new Collection<CartItem>(this);

  static create(data: ProductProps) {
    const product = new Product();
    product.label = data.label;
    return product;
  }
}
