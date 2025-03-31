/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/product.entity';
import { Repository } from 'typeorm';
import { UploadFileDto } from './dto/uploadFile.dto'; // Importa el DTO

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}
  async uploadFile(
    file: UploadFileDto,
    id: string,
  ): Promise<{ imgUrl: string }> {
    try {
      console.log('File received:', {
        originalname: file.originalname,
        bufferLength: file.buffer?.length,
      });

      if (!file.buffer || file.buffer.length === 0) {
        throw new InternalServerErrorException('File buffer is empty');
      }

      console.log('Uploading file to Cloudinary:', file.originalname);
      const url = await this.cloudinaryService.uploadFile(
        file.buffer,
        file.originalname,
      );
      // console.log('Cloudinary upload success:', url);

      // console.log('ID recibido para actualización:', id);

      const product = await this.productsRepository.findOne({ where: { id } });
      // console.log('Product found:', product);

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Método alternativo usando save() en lugar de update()
      product.imgUrl = url;
      await this.productsRepository.save(product);
      console.log('Product updated successfully:', product);

      return { imgUrl: url };
    } catch (error) {
      console.error('Upload Error:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException({
        message: 'Detailed Error',
        error: error.message,
        stack: error.stack,
      });
    }
  }
}
