import { OrderDetails } from 'src/modules/orderDetail/entity/order.detail.entity';
import { Products } from 'src/modules/products/product.entity';
export declare class OrderResponseDto {
    id: string;
    price: number;
    product: Products[];
    order: {
        id: string;
        date: Date;
        user: {
            id: string;
        };
    };
    constructor(orderDetail: OrderDetails);
}
