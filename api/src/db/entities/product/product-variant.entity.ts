import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductVariant extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  product!: Product;

  @Property()
  name!: string;
}
