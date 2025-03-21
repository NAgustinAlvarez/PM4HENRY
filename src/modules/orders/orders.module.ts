import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderDetailService } from '../orderDetail/orderDetail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/order.entity';
import { OrderDetails } from '../orderDetail/entity/order.detail.entity';
import { Users } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Products } from '../products/product.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderDetailService, UsersService, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([OrderDetails]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Categories]),
    UsersModule,
    ProductsModule,
    FilesModule,
  ],
})
export class OrdersModule {}
