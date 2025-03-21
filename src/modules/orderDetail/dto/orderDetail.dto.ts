import { Orders } from 'src/modules/orders/entity/order.entity';
import { Products } from 'src/modules/products/product.entity';

export class OrderDetailDto {
  price: number;
  products: Partial<Products>[]; // Acepta productos parciales
  order: Orders;
}
