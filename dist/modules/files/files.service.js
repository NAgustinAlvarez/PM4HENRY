"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("./cloudinary.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../products/product.entity");
const typeorm_2 = require("typeorm");
let FileUploadService = class FileUploadService {
    constructor(cloudinaryService, productsRepository) {
        this.cloudinaryService = cloudinaryService;
        this.productsRepository = productsRepository;
    }
    async uploadFile(file, id) {
        try {
            console.log('File received:', {
                originalname: file.originalname,
                bufferLength: file.buffer?.length,
            });
            if (!file.buffer || file.buffer.length === 0) {
                throw new common_1.InternalServerErrorException('File buffer is empty');
            }
            console.log('Uploading file to Cloudinary:', file.originalname);
            const url = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
            const product = await this.productsRepository.findOne({ where: { id } });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${id} not found`);
            }
            product.imgUrl = url;
            await this.productsRepository.save(product);
            console.log('Product updated successfully:', product);
            return { imgUrl: url };
        }
        catch (error) {
            console.error('Upload Error:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException({
                message: 'Detailed Error',
                error: error.message,
                stack: error.stack,
            });
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        typeorm_2.Repository])
], FileUploadService);
//# sourceMappingURL=files.service.js.map