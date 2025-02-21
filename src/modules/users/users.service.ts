import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(+page, +limit);
  }
  getUserById(id: number) {
    return this.userRepository.getById(id);
  }
  createUser(user: Omit<User, 'id'>): User {
    return this.userRepository.createUser(user);
  }
  modifiedUser(id: number, user: Partial<User>) {
    return this.userRepository.modifiedUser(id, user);
  }
  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
