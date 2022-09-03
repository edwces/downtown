import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerRequestDTO } from './request/create-customer.request.dto';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomerService = {
    findAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn((dto: CreateCustomerRequestDTO) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    controller = module.get<CustomerController>(CustomerController);
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
      expect(
        await controller.create({
          email: 'hello@wp.pl',
          password: 'password',
          name: 'Bob',
          surname: 'Man',
        }),
      ).toEqual(undefined);
    });
  });
});
