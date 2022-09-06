import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './request/sign-in.request.dto';
import { SignUpRequestDTO } from './request/sign-up.request.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signUp: jest.fn((dto: SignUpRequestDTO) => Promise.resolve()),
    signIn: jest.fn((dto: SignInRequestDTO) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /sign-up', () => {
    it('should not return anything', async () => {
      expect(
        await controller.signUp({
          email: 'hello@wp',
          password: 'password',
          name: 'Bob',
          surname: 'Man',
        }),
      ).toEqual(undefined);
    });
  });

  describe('POST /sign-in', () => {
    it('should not return anything', async () => {
      expect(
        await controller.signIn({ email: 'hello@wp', password: 'password' }),
      ).toEqual(undefined);
    });
  });
});
