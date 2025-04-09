import { OrderDetails } from './entity/order.detail.entity';
import { Repository } from 'typeorm';
import { OrderDetailDto } from './dto/orderDetail.dto';
export declare class OrderDetailService {
    private readonly orderDetailRepository;
    findOneByOrderId(orderId: string, relations?: string[]): Promise<OrderDetails[]>;
    constructor(orderDetailRepository: Repository<OrderDetails>);
    create(orderDetailDto: OrderDetailDto): Promise<OrderDetails>;
}
