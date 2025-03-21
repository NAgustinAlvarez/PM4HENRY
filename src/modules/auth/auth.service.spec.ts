/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from 'src/enum/roles.enum';
import { CreateUserDto } from '../users/users.dto';
import { Orders } from '../orders/entity/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UsersService> = {
      createUser: async (user: CreateUserDto) => {
        return {
          ...user, // Copia todas las propiedades del DTO
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Mock de ID
          administrator: Role.User, // Mock de rol
          password: undefined, // Simula que la contraseña no se devuelve
          orders: {
            id: 'mock-order-id', // Mock de ID de orders
            date: new Date(), // Mock de fecha
            orderDetails: [], // Mock de orderDetails (puede ser un array vacío o un mock más complejo)
            user: null, // Mock de user (puede ser null o un mock de Users)
          } as unknown as Orders, // Asegúrate de que coincida con el tipo Orders
          country: user.country || 'defaultCountry', // Valor por defecto si es opcional
          address: user.address || 'defaultAddress', // Valor por defecto si es opcional
          city: user.city || 'defaultCity', // Valor por defecto si es opcional
        };
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({
              ...dto,
              id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            })),
            save: jest.fn().mockImplementation((user) => Promise.resolve(user)),
          },
        },
        { provide: JwtService, useValue: {} },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new CreateUserDto({
    name: 'nico',
    password: '123456',
    confirmPassword: '123456',
    email: 'nico@gmail.com',
    address: 'villanueva123',
    phone: 12344,
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('signUp() create a new user with encrypted password', async () => {
    const user = await service.signUpUser(mockUser);
    console.log(user);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrator', Role.User);
  });
});
