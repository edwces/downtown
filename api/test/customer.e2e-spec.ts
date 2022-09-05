import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Customer } from '../src/modules/customer/customer.entity';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeEach(async () => {
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

  describe('GET /', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer()).get('/customers').expect(200);
    });

    it('should return array of customers', async () => {
      const em = orm.em.fork();
      const customer = await Customer.create({
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      });
      await em.persistAndFlush(customer);

      const response = await request(app.getHttpServer()).get('/customers');

      expect(response.body).toEqual(
        JSON.parse(JSON.stringify(await em.find(Customer, {}))),
      );
    });
  });

  describe('POST /', () => {
    it('should return status 201', () => {
      const dto = {
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      };
      return request(app.getHttpServer())
        .post('/customers')
        .send(dto)
        .expect(201);
    });

    it('should not return anything', async () => {
      const dto = {
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      };

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(dto);

      expect(response.body).toEqual({});
    });
  });
});
