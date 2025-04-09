import { Users } from 'src/modules/users/user.entity';
import { OrderDetails } from 'src/modules/orderDetail/entity/order.detail.entity';
export declare class Orders {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: Users;
}
