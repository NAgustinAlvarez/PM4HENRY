import { Categories } from 'src/modules/categories/entities/category.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  Unique,
} from 'typeorm';
import { OrderDetails } from '../orderDetail/entity/order.detail.entity';

@Entity({ name: 'PRODUCTS' })
@Unique(['name'])
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    default: 'https://example.com/default-image.png',
  })
  imgUrl: string; // URL de la imagen del producto

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  // Relación N:N con OrderDetail
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[]; // Un producto puede estar en muchos detalles de pedido
}
