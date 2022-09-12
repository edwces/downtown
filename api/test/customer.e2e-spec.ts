import { MikroORM } from '@mikro-orm/core';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Customer } from '../src/modules/customer/customer.entity';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CustomerController (e2e)', () => {
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
    it('when asked should return status 200 and retrieve an array of customer records', async () => {
      // Arrange
      const em = orm.em.fork();
      const customer = await Customer.create({
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      });
      await em.persistAndFlush(customer);

      // Act
      const response = await request(app.getHttpServer()).get('/customers');

      // Assert
      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        JSON.parse(JSON.stringify(await em.find(Customer, {}))),
      );
    });
  });

  describe('POST /', () => {
    it('when adding new valid customer, then should get approval with status 201', async () => {
      const dto = {
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      };
      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(dto);

      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual({});
    });
  });
});
