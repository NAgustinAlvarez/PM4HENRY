import { Module } from '@nestjs/common';
import { FileUploadService } from './files.service';
import { CloudinaryService } from './cloudinary.service';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/product.entity';
import { FilesController } from './files.controler';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Products])],
  controllers: [FilesController],
  providers: [FileUploadService, CloudinaryService],
  exports: [FileUploadService],
})
export class FilesModule {}
