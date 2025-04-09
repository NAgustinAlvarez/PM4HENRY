import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Orders } from './entity/order.entity';
import { Users } from 'src/modules/users/user.entity';
import { OrderDetailService } from '../orderDetail/orderDetail.service';
import { Products } from '../products/product.entity';
import { OrderDetails } from '../orderDetail/entity/order.detail.entity';
export interface ProductId {
    id: string;
}
export declare class OrdersService {
    private orderRepository;
    private orderDetailRepository;
    private userRepository;
    private productRepository;
    private orderDService;
    findOne(id: string): Promise<OrderDetails[] | null>;
    constructor(orderRepository: Repository<Orders>, orderDetailRepository: Repository<OrderDetails>, userRepository: Repository<Users>, productRepository: Repository<Products>, orderDService: OrderDetailService);
    create(createOrderDto: CreateOrderDto): Promise<OrderDetails>;
    private updateProductsStock;
    private calculateTotal;
    private validatedProducts;
}
