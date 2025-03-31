import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  // Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
// import { CreateUserDto } from './users.dto';
import { Users } from './user.entity';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const definedPage = page ? +page : 1;
    const definedLimit = limit ? +limit : 5;
    return this.usersService.getUsers(definedPage, definedLimit);
  }
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'id no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const userFound = await this.usersService.getUserById(id);
    if (!userFound) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Usuario no encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
    return userFound;
  }
  // @Post()
  // postUsers(@Body() user: CreateUserDto) {
  //   const userCreated = this.usersService.createUser(user);
  //   return userCreated;
  // }
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async putUsers(@Param('id') id: string, @Body() user: Partial<Users>) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'ID no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.usersService.modifiedUser(id, user);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuario con ID ${id} no encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUsers(@Param('id') id: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'ID no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.usersService.deleteUser(id);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuario con ID ${id} no encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
