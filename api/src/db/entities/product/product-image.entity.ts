import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../common/base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductImage extends CustomBaseEntity {
  @ManyToOne({ primary: true })
  product!: Product;

  @PrimaryKey()
  index!: number;

  @Property()
  url!: string;

  [PrimaryKeyType]?: [number, number];
}
