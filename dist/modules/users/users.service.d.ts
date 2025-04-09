import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
export declare class UsersService {
    private usersRepositoryDB;
    constructor(usersRepositoryDB: Repository<Users>);
    getUsers(page: number, limit: number): Promise<{
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
    }[]>;
    getUserById(id: string): Promise<Users | null>;
    createUser(user: CreateUserDto): Promise<{
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
    modifiedUser(id: string, user: Partial<Users>): Promise<{
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
    } | null>;
    deleteUser(id: string): Promise<{
        message: string;
    } | null>;
}
