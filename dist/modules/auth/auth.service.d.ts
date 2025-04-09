import { Users } from '../users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/users.dto';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    signUpUser(credentials: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        orders: import("../orders/entity/order.entity").Orders;
        administrator: string;
        birthdate: Date;
    }>;
    signUser(email: string, password: string): Promise<{
        token: string;
    }>;
    getAuths(): string;
}
