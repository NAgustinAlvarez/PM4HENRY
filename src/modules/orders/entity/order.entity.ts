import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from 'src/modules/users/user.entity';
import { OrderDetails } from 'src/modules/orderDetail/entity/order.detail.entity';

@Entity({ name: 'ORDERS' })
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: Date;
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  @JoinColumn({ name: 'ORDER_ID' })
  orderDetails: OrderDetails;
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
