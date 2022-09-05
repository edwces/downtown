import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';

// This needs to be configured separetely from the nestjs app
// because of mikro-orm-cli and testing

dotenv.config();

export default {
  type: 'postgresql',
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  host: process.env['DB_HOST'],
  port: Number.parseInt(process.env['DB_PORT']),
  password: process.env['DB_PASSWORD'],
  user: process.env['DB_USER'],
  dbName: process.env['DB_NAME'],
  migrations: {
    tableName: 'migrations',
    pathTs: './src/database/migrations',
    path: './dist/database/migrations',
  },
  seeder: {
    pathTs: './src/database/seeders',
    path: './dist/database/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
} as MikroOrmModuleSyncOptions;
