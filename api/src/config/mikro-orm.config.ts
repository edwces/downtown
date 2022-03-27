import { Options } from '@mikro-orm/core';
import { ProductImage } from '../db/entities/product/product-image.entity';
import { Product } from '../db/entities/product/product.entity';
import environment from './environment';

export default {
  type: 'postgresql',
  host: environment.db.host,
  port: environment.db.port,
  user: environment.db.username,
  password: environment.db.password,
  dbName: environment.db.name,
  debug: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
} as Options;
