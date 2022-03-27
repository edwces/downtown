import request from 'supertest';
import createApp from '../../app';

describe('Product API', () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = await createApp;
  });

  it('GET /product --> expects an array of product items', () => {
    return request(app)
      .get('/product')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number),
              image: expect.any(String),
            }),
          ])
        );
      });
  });
  it('GET /product/:id --> expects a todo with specified id', () => {
    return request(app)
      .get('/product/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            image: expect.any(String),
          })
        );
      });
  });
  it('GET /product/:id --> expects a 404 NotFound Error', () => {
    return request(app).get('/product/999999999').expect(404);
  });
});
