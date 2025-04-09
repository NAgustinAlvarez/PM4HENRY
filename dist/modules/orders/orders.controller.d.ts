import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/response-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findOne(id: string): Promise<import("../orderDetail/entity/order.detail.entity").OrderDetails[]>;
}
