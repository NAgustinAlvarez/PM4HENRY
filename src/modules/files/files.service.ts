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
    file: UploadFileDto, // Ahora esperamos un DTO
    id: string,
  ): Promise<{ imgUrl: string }> {
    try {
      // Subir el archivo a Cloudinary usando los datos del DTO
      const url = await this.cloudinaryService.uploadFile(
        file.buffer,
        file.originalname,
      );

      // Verificar si el producto existe
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Actualizar el producto con la nueva URL de la imagen
      await this.productsRepository.update(id, { imgUrl: url });

      return { imgUrl: url };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while uploading the file or updating the product',
      );
    }
  }
}
