import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductRequestDTO } from './request/create-product.request.dto';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    findAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn((data: CreateProductRequestDTO) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get(ProductController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('when called should provide array of Products', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(mockProductService.findAll).toBeCalledTimes(1);
    });
  });
  describe('POST /', () => {
    it('when called should not provide anything', async () => {
      const result = await controller.create({ label: 't-shirt' });
      expect(result).toBeUndefined();
      expect(mockProductService.create).toBeCalledTimes(1);
    });
  });
});
