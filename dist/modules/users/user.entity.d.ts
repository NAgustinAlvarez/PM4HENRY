import { Orders } from '../orders/entity/order.entity';
export declare class Users {
    id: string;
    constructor();
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    orders: Orders;
    administrator: string;
    birthdate: Date;
}
