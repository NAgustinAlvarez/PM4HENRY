import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthGuard } from '../auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Products } from './product.entity';

@Module({
  providers: [ProductsService, AuthGuard],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  exports: [ProductsService],
})
export class ProductsModule {}
