import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/user.entity';
import { SharedModule } from 'src/shared/shared/shared.service';
import { UsersModule } from '../users/users.module';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [SharedModule, UsersModule, TypeOrmModule.forFeature([Users])],
})
export class AuthModule {}
