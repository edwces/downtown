import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

declare global {
  namespace Express {
    interface Request {
      em: EntityManager<IDatabaseDriver<Connection>>;
    }
  }
}
