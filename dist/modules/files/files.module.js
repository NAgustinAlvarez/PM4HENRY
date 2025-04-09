"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const cloudinary_service_1 = require("./cloudinary.service");
const products_module_1 = require("../products/products.module");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../products/product.entity");
const files_controler_1 = require("./files.controler");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [products_module_1.ProductsModule, typeorm_1.TypeOrmModule.forFeature([product_entity_1.Products])],
        controllers: [files_controler_1.FilesController],
        providers: [files_service_1.FileUploadService, cloudinary_service_1.CloudinaryService],
        exports: [files_service_1.FileUploadService],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map