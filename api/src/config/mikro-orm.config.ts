import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

// This needs to be configured separetely from the nestjs app
// because of mikro-orm-cli and testing

export default {
  type: 'postgresql',
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  host: process.env['DB_HOST'],
  password: process.env['DB_PASSWORD'],
  user: process.env['DB_USER'],
  dbName: process.env['DB_NAME'],
  migrations: {
    tableName: 'migrations',
    pathTs: './src/database/migrations',
    path: './dist/database/migrations',
  },
} as MikroOrmModuleSyncOptions;
