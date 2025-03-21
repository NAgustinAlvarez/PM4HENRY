import { Orders } from 'src/modules/orders/entity/order.entity';
import { Products } from 'src/modules/products/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ORDER_DETAILS' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDER_DETAIL_PRODUCTS',
  })
  products: Products[];
  @OneToOne(() => Orders, (order) => order.orderDetails)
  order: Orders;
}
