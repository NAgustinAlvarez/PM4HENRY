import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/order.entity';
import { OrderDetails } from '../orderDetail/entity/order.detail.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderDetailService } from '../orderDetail/orderDetail.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module'; // Asegúrate de importar ProductsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails]),
    UsersModule,
    ProductsModule, // Esta importación es crucial
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderDetailService],
})
export class OrdersModule {}
