import { MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mikroOrmConfig from './config/mikro-orm.config';
import { productRouter } from './modules/product';
import { securityRoutes } from './modules/security';
import { userRouter } from './modules/user';

export default async function createApp() {
  const app = express();

  // Initialize orm
  const orm = await MikroORM.init(mikroOrmConfig);

  // Attach middlewares
  app.use(cors({ origin: '*' }));
  app.use(bodyParser.json());
  app.use((request, response, next) => {
    // Forks new entity manager each requests
    // and run it in asyncLocalStorage
    RequestContext.create(orm.em, () => {
      request.em = orm.em as EntityManager;
      next();
    });
  });

  // Register HTTP Infrastructure
  app.use('/product', productRouter);
  app.use('/user', userRouter);
  app.use('/security', securityRoutes);

  return app;
}
