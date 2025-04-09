"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadPipePipe = void 0;
const common_1 = require("@nestjs/common");
let ImageUploadPipePipe = class ImageUploadPipePipe {
    constructor() {
        this.allowedMymitipes = ['image/png', 'image/jpeg', 'image/gif'];
        this.maxSizeInBytes = 200000;
    }
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file');
        }
        if (!this.allowedMymitipes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type');
        }
        if (file.size > this.maxSizeInBytes) {
            throw new common_1.BadRequestException('File to large');
        }
        return file;
    }
};
exports.ImageUploadPipePipe = ImageUploadPipePipe;
exports.ImageUploadPipePipe = ImageUploadPipePipe = __decorate([
    (0, common_1.Injectable)()
], ImageUploadPipePipe);
//# sourceMappingURL=image.upload.pipe.pipe.js.map