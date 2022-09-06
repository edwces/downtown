import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerRequestDTO } from './request/create-customer.request.dto';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomerService = {
    findAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn((data: CreateCustomerRequestDTO) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    controller = module.get(CustomerController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /', () => {
    it('when called should provide array of Customers', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(mockCustomerService.findAll).toBeCalledTimes(1);
    });
  });
  describe('POST /', () => {
    it('when called should not provide anything', async () => {
      const result = await controller.create({
        email: 'hello@wp.pl',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      });
      expect(result).toBeUndefined();
      expect(mockCustomerService.create).toBeCalledTimes(1);
    });
  });
});
