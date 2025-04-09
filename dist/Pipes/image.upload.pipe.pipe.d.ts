import { PipeTransform } from '@nestjs/common';
export declare class ImageUploadPipePipe implements PipeTransform {
    private readonly allowedMymitipes;
    private readonly maxSizeInBytes;
    transform(file: Express.Multer.File): Express.Multer.File;
}
