import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Orders } from '../orders/entity/order.entity';
import { Role } from 'src/enum/roles.enum';
@Entity({ name: 'USERS' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;
  @Column({ type: 'bigint' })
  phone: number;
  @Column({ type: 'varchar', length: 20, nullable: true })
  country: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;
  @OneToMany(() => Orders, (order) => order.user)
  // @JoinColumn({ name: 'orders_id' })
  orders: Orders;
  // @Column({ type: 'enum', enum: Role, default: Role.User })
  @Column({ default: Role.User })
  administrator: string;
  @Column({ type: 'date', nullable: true })
  birthdate: Date;
}
// id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

// name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

// email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.

// password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.

// phone: debe ser un número entero.

// country: debe ser una cadena de texto de máximo 50 caracteres.

// address: debe ser un texto.

// city: debe ser una cadena de texto de máximo 50 caracteres.

// orders_id: Relación 1:N con orders.
