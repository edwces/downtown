import {
  Check,
  DecimalType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { ProductCategory } from './product-category.entity';

// check if image is an url
// check if price is non negative

@Entity()
@Check({ expression: 'price > 0' })
export class Product extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: DecimalType, scale: 2, precision: 10 })
  price!: number;

  @ManyToOne(() => ProductCategory)
  category!: ProductCategory;

  @Property()
  image!: string;
}
