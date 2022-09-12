import { MikroORM } from '@mikro-orm/core';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Product } from '../src/modules/product/product.entity';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    orm = moduleFixture.get<MikroORM>(MikroORM);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await orm.close();
  });

  afterEach(async () => {
    const generator = orm.getSchemaGenerator();
    await generator.clearDatabase();
  });

  describe('GET /', () => {
    it('when asked should return status 200 and retrieve array of product records', async () => {
      const em = orm.em.fork();
      const customer = Product.create({ label: 'T-shirt' });
      await em.persistAndFlush(customer);

      const response = await request(app.getHttpServer()).get('/products');

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        JSON.parse(JSON.stringify(await em.find(Product, {}))),
      );
    });
  });

  describe('POST /', () => {
    it('when adding a new valid product, then should get an approval with status 201', async () => {
      const dto = {
        label: 'T-shirt',
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .send(dto);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual({});
    });
  });
});
