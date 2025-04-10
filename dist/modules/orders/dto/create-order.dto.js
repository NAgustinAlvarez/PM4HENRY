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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = exports.ProductIdDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProductIdDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.ProductIdDto = ProductIdDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Se requiere que el id del producto no esté vacío.' }),
    (0, class_validator_1.IsUUID)('4', {
        message: 'El id del producto debe tener un formato UUID válido.',
    }),
    __metadata("design:type", String)
], ProductIdDto.prototype, "id", void 0);
class CreateOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, products: { required: true, type: () => [require("./create-order.dto").ProductIdDto], minItems: 1 } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Se requiere que el userId no esté vacío.' }),
    (0, class_validator_1.IsUUID)('4', { message: 'El userId debe tener un formato UUID válido.' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Se espera que products sea un array.' }),
    (0, class_validator_1.ArrayMinSize)(1, {
        message: 'El array products debe contener al menos un elemento.',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductIdDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
//# sourceMappingURL=create-order.dto.js.map