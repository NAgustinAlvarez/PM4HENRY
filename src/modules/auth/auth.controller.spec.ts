/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './loginUser.dto';
import { CreateUserDto } from '../users/users.dto';
import { UserResponseDto } from '../users/user.response.dto';
import { Users } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAuths: jest.fn(),
            signUser: jest.fn(),
            signUpUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('getAuths', () => {
    it('debería devolver el mensaje "Get all auth"', () => {
      jest.spyOn(authService, 'getAuths').mockReturnValue('Get all auth');

      const result = controller.getAuths();

      expect(result).toBe('Get all auth');

      expect(authService.getAuths).toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    it('debería devolver un token al iniciar sesión', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockToken = { token: 'mock-token' };

      jest.spyOn(authService, 'signUser').mockResolvedValue(mockToken);

      const result = await controller.signIn(loginUserDto);

      expect(result).toEqual(mockToken);

      expect(authService.signUser).toHaveBeenCalledWith(
        loginUserDto.email,
        loginUserDto.password,
      );
    });
  });

  describe('signup', () => {
    it('debería registrar un usuario y devolver un UserResponseDto', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        phone: 123456789,
        country: 'USA',
        address: '123 Main St',
        city: 'New York',
      };

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        phone: 123456789,
        country: 'USA',
        adress: '123 Main St',
        city: 'New York',
        administrator: 'user',
        orders: [],
      } as unknown as Users;

      const mockUserResponseDto = new UserResponseDto(mockUser);

      jest.spyOn(authService, 'signUpUser').mockResolvedValue(mockUser);

      const result = await controller.postUsers(createUserDto);

      expect(result).toEqual(mockUserResponseDto);

      expect(authService.signUpUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});
