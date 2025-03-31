import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule)],
  providers: [UsersService, AuthGuard],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule.forFeature([Users]), AuthGuard],
})
export class UsersModule {}
