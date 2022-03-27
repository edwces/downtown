import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => Product, (product) => product.category)
  products = new Collection<Product>(this);

  @Property()
  name!: string;
}
