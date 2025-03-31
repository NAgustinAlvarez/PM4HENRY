import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepositoryDB: Repository<Users>,
  ) {}
  async getUsers(page: number, limit: number) {
    const definedPage = page;
    const definedLimit = limit;
    const startIndex = (definedPage - 1) * definedLimit;
    const endIndex = startIndex + definedLimit;
    const allUsers = await this.usersRepositoryDB.find();
    const paginatedUsers = allUsers.slice(startIndex, endIndex);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const withoutPassword = paginatedUsers.map(({ password, ...user }) => user);
    return withoutPassword;
  }
  async getUserById(id: string) {
    return this.usersRepositoryDB.findOne({
      where: { id },
      relations: ['orders'], // Incluir la relación "orders"
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        address: true,
        city: true,
        orders: {
          id: true,
          date: true,
        },
      },
    });
  }
  async createUser(user: CreateUserDto) {
    const usercreated = this.usersRepositoryDB.create(user);
    await this.usersRepositoryDB.save(usercreated);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = usercreated;
    return data;
  }

  async modifiedUser(id: string, user: Partial<Users>) {
    const userToModify = await this.usersRepositoryDB.findOne({
      where: { id },
    });
    if (!userToModify) {
      return null;
    }
    Object.assign(userToModify, user);
    const modified = await this.usersRepositoryDB.save(userToModify);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...withoutPassword } = modified;
    return withoutPassword;
  }
  async deleteUser(id: string) {
    const user = await this.usersRepositoryDB.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    await this.usersRepositoryDB.delete({ id });
    return { message: 'User deleted successfully' };
  }
}
