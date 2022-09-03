import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CustomerSeeder } from 'src/database/seeders/customer.seeder';
import { CustomerModule } from 'src/modules/customer/customer.module';
import request from 'supertest';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(), CustomerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    const orm = app.get<MikroORM>(MikroORM);
    const seeder = orm.getSeeder();

    await orm.getSchemaGenerator().refreshDatabase();
    await seeder.seed(CustomerSeeder);
  });

  describe('GET /', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer()).get('/').expect(200);
    });
  });
});
