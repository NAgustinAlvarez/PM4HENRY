import { UsersService } from './users.service';
import { Users } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page?: string, limit?: string): Promise<{
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
    getUserById(id: string): Promise<Users>;
    putUsers(id: string, user: Partial<Users>): Promise<{
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
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
