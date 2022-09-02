import { Entity, EntityDTO, PrimaryKey, Property } from '@mikro-orm/core';
import { Basic } from 'src/common/basic.entity';

type ProductProps = Pick<EntityDTO<Product>, 'label'>;

@Entity()
export class Product extends Basic {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;

  static create(data: ProductProps) {
    const product = new Product();
    product.label = data.label;
    return product;
  }
}
