import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { ProductCategory } from './product-category.entity';

// check if image is an url
// check if price is non negative

@Entity()
export class Product extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @ManyToOne(() => ProductCategory)
  category!: ProductCategory;

  @Property()
  image!: string;
}
