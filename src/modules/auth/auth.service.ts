import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  signUser(email: string, password: string) {
    return this.userRepository.loginUser(email, password);
  }
  getAuths() {
    return 'Get all auth';
  }
}
