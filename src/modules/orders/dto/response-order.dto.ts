import { OrderDetails } from 'src/modules/orderDetail/entity/order.detail.entity';
import { Products } from 'src/modules/products/product.entity';

export class OrderResponseDto {
  id: string;
  price: number;
  product: Products[];
  order: { id: string; date: Date; user: { id: string } };
  constructor(orderDetail: OrderDetails) {
    this.id = orderDetail.id;
    this.price = orderDetail.price;
    this.product = orderDetail.products;
    this.order = {
      id: orderDetail.order.id,
      date: orderDetail.order.date,
      user: { id: orderDetail.order.user.id },
    };
  }
}
