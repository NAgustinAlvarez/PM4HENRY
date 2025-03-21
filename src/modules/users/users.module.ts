import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { AuthGuard } from '../auth/auth.guard';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService, UsersRepository, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
