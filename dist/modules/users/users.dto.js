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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "Nombre completo del usuario.\nDebe tener entre 3 y 80 caracteres.", example: "Juan P\u00E9rez", minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, description: "Correo electr\u00F3nico del usuario.\nDebe ser un correo v\u00E1lido.", example: "juan.perez@example.com", format: "email" }, password: { required: true, type: () => String, description: "Contrase\u00F1a del usuario.\nDebe tener entre 8 y 15 caracteres, incluyendo al menos una letra may\u00FAscula,\nuna letra min\u00FAscula, un n\u00FAmero y un car\u00E1cter especial (!@#$%^&*).", example: "Password123!", minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])/" }, phone: { required: true, type: () => Number, description: "N\u00FAmero de tel\u00E9fono del usuario.\nDebe ser un n\u00FAmero v\u00E1lido.", example: 1234567890, minimum: 1 }, birthdate: { required: true, type: () => String }, country: { required: false, type: () => String, description: "Pa\u00EDs del usuario (opcional).\nDebe tener entre 5 y 15 caracteres.", example: "M\u00E9xico", minLength: 5, maxLength: 20 }, address: { required: false, type: () => String, description: "Direcci\u00F3n del usuario (opcional).\nDebe tener entre 3 y 80 caracteres.", example: "Calle Falsa 123", minLength: 3, maxLength: 80 }, city: { required: false, type: () => String, description: "Ciudad del usuario (opcional).\nDebe tener entre 5 y 20 caracteres.", example: "Ciudad de M\u00E9xico", minLength: 5, maxLength: 20 }, confirmPassword: { required: true, type: () => String, description: "Confirmaci\u00F3n de la contrase\u00F1a del usuario.\nDebe coincidir con la contrase\u00F1a proporcionada.", example: "Password123!" } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 15, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'La contraseña debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20, {
        message: 'El país debe tener entre 5 y 15 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80, {
        message: 'La dirección debe tener entre 3 y 80 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20, {
        message: 'La ciudad debe tener entre 5 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=users.dto.js.map