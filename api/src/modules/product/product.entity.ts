import { Entity, EntityDTO, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  label!: string;

  static create(data: Omit<EntityDTO<Product>, 'id'>) {
    const product = new Product();
    product.label = data.label;
    return product;
  }
}
