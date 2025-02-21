import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const definedPage = page ? +page : 1;
    const definedLimit = limit ? +limit : 5;
    return this.usersService.getUsers(definedPage, definedLimit);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    const userFound = this.usersService.getUserById(Number(id));
    return userFound;
  }
  @Post()
  postUsers(@Body() user: User) {
    const userCreated: User = this.usersService.createUser(user);
    return 'el id del usuario es, id:' + userCreated.id;
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  putUsers(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.usersService.modifiedUser(+id, user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUsers(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
