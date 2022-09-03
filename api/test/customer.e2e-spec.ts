import { MikroOrmModule } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CustomerModule } from 'src/modules/customer/customer.module';
import * as request from 'supertest';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(), CustomerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer()).get('/').expect(200);
    });
  });
});
