import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { ProductCategory } from './product-category.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @ManyToOne()
  category!: ProductCategory;

  @OneToMany(() => ProductImage, (pimage) => pimage.product, {
    cascade: [Cascade.ALL],
  })
  images = new Collection<ProductImage>(this);
}
