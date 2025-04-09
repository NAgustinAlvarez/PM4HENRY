import { Orders } from 'src/modules/orders/entity/order.entity';
import { Products } from 'src/modules/products/product.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    products: Products[];
    order: Orders;
}
