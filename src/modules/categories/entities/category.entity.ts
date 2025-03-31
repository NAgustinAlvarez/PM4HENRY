import { Products } from 'src/modules/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'CATEGORIES' })
export class Categories {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
