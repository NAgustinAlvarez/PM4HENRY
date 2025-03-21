import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './files.service';
import { ImageUploadPipePipe } from 'src/Pipes/image.upload.pipe.pipe';
import { UploadFileDto } from './dto/uploadFile.dto'; // Importa el DTO
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FileUploadService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('uploadImage/:productid')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile(ImageUploadPipePipe) file: Express.Multer.File, // Aplica el pipe aquí
  ) {
    // Convierte el archivo a una instancia de UploadFileDto
    console.log('MIME Type:', file.mimetype);
    const uploadFileDto: UploadFileDto = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };

    // Llama al servicio con el DTO
    return this.filesService.uploadFile(uploadFileDto, id);
  }
}
