import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiOptions } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
const envPath = path.resolve(__dirname, '../../.env.development');
dotenvConfig({ path: envPath });
@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(buffer: Buffer, originalName?: string): Promise<string> {
    const options: UploadApiOptions = {
      folder: 'uploads',
      public_id: originalName,
      resource_type: 'auto',
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          } else if (!result) {
            reject(new Error('No se pudo obtener el resultado de Cloudinary'));
          } else {
            resolve(result.secure_url);
          }
        },
      );
      stream.write(buffer);
      stream.end();
    });
  }
}
