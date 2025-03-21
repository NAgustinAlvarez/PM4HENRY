import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './loginUser.dto';
import { CreateUserDto } from '../users/users.dto';
import { UserResponseDto } from '../users/user.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuths() {
    return this.authService.getAuths();
  }
  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.authService.signUser(email, password);
  }
  @Post('signup')
  // @UseInterceptors(DateAdderInterceptor)
  async postUsers(@Body() user: CreateUserDto) {
    const newUser = await this.authService.signUpUser(user);
    return new UserResponseDto(newUser);
  }
}
