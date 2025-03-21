import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadPipePipe implements PipeTransform {
  private readonly allowedMymitipes = ['image/png', 'image/jpeg', 'image/gif'];
  private readonly maxSizeInBytes = 200000;
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file');
    }
    if (!this.allowedMymitipes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('File to large');
    }
    return file;
  }
}
