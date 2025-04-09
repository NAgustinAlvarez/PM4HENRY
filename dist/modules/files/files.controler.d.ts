import { FileUploadService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FileUploadService);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        imgUrl: string;
    }>;
}
