/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { Role } from 'src/enum/roles.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signUpUser(credentials: CreateUserDto) {
    console.log(credentials);

    // Verificar si las contraseñas coinciden
    if (credentials.password !== credentials.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    // Hashear la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser = this.usersRepository.create({
      ...credentials,
      password: hashedPassword,
      administrator: Role.User,
    });
    return await this.usersRepository.save(newUser);
    // const createdUser = await this.usersRepository.save(newUser);
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...userWithoutPassword } = createdUser;
    // return userWithoutPassword;
  }
  async signUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException('No se encontraron coincidencias', 404);
    }
    const isPasswordMatching = await compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: user.administrator,
    };
    console.log(userPayload);
    const token = await this.jwtService.signAsync(userPayload);
    return { token };
  }

  getAuths() {
    return 'Get all auth';
  }
}
