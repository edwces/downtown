import { Property } from '@mikro-orm/core';

export abstract class Basic {
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date;
}
