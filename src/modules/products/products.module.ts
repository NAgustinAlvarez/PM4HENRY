import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  providers: [ProductsService, ProductsRepository, AuthGuard],
  controllers: [ProductsController],
})
export class ProductsModule {}
