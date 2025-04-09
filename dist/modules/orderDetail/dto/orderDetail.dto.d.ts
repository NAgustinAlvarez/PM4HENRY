import { Orders } from 'src/modules/orders/entity/order.entity';
import { Products } from 'src/modules/products/product.entity';
export declare class OrderDetailDto {
    price: number;
    products: Partial<Products>[];
    order: Orders;
}
