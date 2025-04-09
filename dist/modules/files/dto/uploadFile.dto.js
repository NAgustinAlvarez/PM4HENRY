"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileDto = void 0;
const openapi = require("@nestjs/swagger");
class UploadFileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fieldname: { required: true, type: () => String }, originalname: { required: true, type: () => String }, mimetype: { required: true, type: () => String }, size: { required: true, type: () => Number }, buffer: { required: true } };
    }
}
exports.UploadFileDto = UploadFileDto;
//# sourceMappingURL=uploadFile.dto.js.map