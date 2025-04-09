import { CloudinaryService } from './cloudinary.service';
import { Products } from '../products/product.entity';
import { Repository } from 'typeorm';
import { UploadFileDto } from './dto/uploadFile.dto';
export declare class FileUploadService {
    private readonly cloudinaryService;
    private productsRepository;
    constructor(cloudinaryService: CloudinaryService, productsRepository: Repository<Products>);
    uploadFile(file: UploadFileDto, id: string): Promise<{
        imgUrl: string;
    }>;
}
