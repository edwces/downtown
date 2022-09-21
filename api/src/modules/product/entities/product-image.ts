import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class ProductImage {
  @Property()
  path!: string;
}
