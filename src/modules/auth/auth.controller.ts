import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuths() {
    return this.authService.getAuths();
  }
  @Post('signin')
  signIn(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.signUser(email, password);
  }
}
