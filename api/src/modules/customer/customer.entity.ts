import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Customer {
  @PrimaryKey()
  id: number;
}
