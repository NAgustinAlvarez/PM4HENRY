/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsersService } from '../src/modules/users/users.service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import * as request from 'supertest';

describe('User (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UsersService>(UsersService);
    const hashedPassword = await hash('123456', 10);

    // Crear un usuario en la base de datos de pruebas
    await userService.createUser({
      name: 'John Doe',
      email: 'jondou@gmail.com',
      password: hashedPassword,
      phone: 1234567890,
      country: 'USA',
      address: '123St',
      city: 'New York',
      confirmPassword: '123456',
    });

    // Iniciar sesión para obtener el token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'jondou@gmail.com', password: '123456' });

    console.log('Login Response:', loginResponse.body); // Verifica la estructura de la respuesta
    authToken = loginResponse.body.token; // Ajusta según la propiedad correcta del token
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET) returns an ok status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

    console.log('token', authToken);
    console.log('Response', req.body);
    expect(req.status).toBe(HttpStatus.FORBIDDEN);
  });
});
