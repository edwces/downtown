import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { Product } from '../product/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  quantity!: number;

  @ManyToOne()
  product!: Product;

  @ManyToOne(() => Cart)
  cart!: Cart;
}
