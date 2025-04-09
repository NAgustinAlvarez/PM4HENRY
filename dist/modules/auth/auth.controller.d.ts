import { AuthService } from './auth.service';
import { LoginUserDto } from './loginUser.dto';
import { CreateUserDto } from '../users/users.dto';
import { UserResponseDto } from '../users/user.response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuths(): string;
    signIn(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    postUsers(user: CreateUserDto): Promise<UserResponseDto>;
}
