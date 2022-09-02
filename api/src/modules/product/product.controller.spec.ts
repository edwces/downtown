import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    findAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn((dto: CreateProductRequestDTO) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('should returns Array of Customers', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });
  describe('POST /', () => {
    it('should not return anything', async () => {
      expect(await controller.create({ label: 't-shirt' })).toEqual(undefined);
    });
  });
});
