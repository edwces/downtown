import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './request/sign-in.request.dto';
import { SignUpRequestDTO } from './request/sign-up.request.dto';
import httpMocks from 'node-mocks-http';
import { Customer } from '../customer/customer.entity';

describe('AuthController', () => {
  let controller: AuthController;

  const EXAMPLE_TOKEN = 'token';

  const mockCustomer = {
    id: 1,
    email: 'hello@wp',
    password: 'password',
    name: 'Bob',
    surname: 'Man',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'USER',
  };

  const mockAuthService = {
    signUp: jest.fn((data: SignUpRequestDTO) => Promise.resolve()),
    signIn: jest.fn((data: SignInRequestDTO) => Promise.resolve(mockCustomer)),
    refresh: jest.fn((id: number) => Promise.resolve(mockCustomer)),
    createAccessToken: jest.fn((data: Customer) =>
      Promise.resolve(EXAMPLE_TOKEN),
    ),
    createRefreshToken: jest.fn((data: Customer) =>
      Promise.resolve(EXAMPLE_TOKEN),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /sign-up', () => {
    it('when called should not provide anything', async () => {
      const result = await controller.signUp({
        email: 'hello@wp',
        password: 'password',
        name: 'Bob',
        surname: 'Man',
      });
      expect(result).toBeUndefined();
      expect(mockAuthService.signUp).toBeCalledTimes(1);
    });
  });

  describe('POST /sign-in', () => {
    it('when called should return user and access token', async () => {
      const response = httpMocks.createResponse();

      const result = await controller.signIn(response, {
        email: 'hello@wp',
        password: 'password',
      });

      expect(result).toEqual({ customer: mockCustomer, token: EXAMPLE_TOKEN });
      expect(mockAuthService.signIn).toBeCalledTimes(1);
      expect(mockAuthService.createAccessToken).toBeCalledTimes(1);
      expect(mockAuthService.createRefreshToken).toBeCalledTimes(1);
    });
  });

  describe('POST /sign-out', () => {
    it('should not return anything', async () => {
      const response = httpMocks.createResponse();

      const result = await controller.signOut(response);
      expect(result).toBeUndefined();
    });
  });

  describe('POST /refresh', () => {
    it('when called should provide customer data and new token', async () => {
      const result = await controller.refresh(1);
      expect(result).toEqual({ customer: mockCustomer, token: EXAMPLE_TOKEN });
      expect(mockAuthService.refresh).toBeCalledTimes(1);
      expect(mockAuthService.createAccessToken).toBeCalledTimes(1);
    });
  });
});
