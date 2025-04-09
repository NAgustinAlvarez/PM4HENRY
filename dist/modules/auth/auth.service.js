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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const bcrypt_1 = require("bcrypt");
const roles_enum_1 = require("../../enum/roles.enum");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signUpUser(credentials) {
        if (credentials.password !== credentials.confirmPassword) {
            throw new common_1.BadRequestException('Las contraseñas no coinciden');
        }
        const existingUser = await this.usersRepository.findOne({
            where: { email: credentials.email },
        });
        if (existingUser) {
            throw new common_1.HttpException('El email ya está registrado', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const toDate = new Date(credentials.birthdate);
        const newUser = this.usersRepository.create({
            ...credentials,
            password: hashedPassword,
            administrator: roles_enum_1.Role.User,
            birthdate: toDate,
        });
        const savedUser = await this.usersRepository.save(newUser);
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async signUser(email, password) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException('No se encontraron coincidencias', 404);
        }
        const isPasswordMatching = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.UNAUTHORIZED);
        }
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: user.administrator,
        };
        console.log(userPayload);
        const token = await this.jwtService.signAsync(userPayload);
        return { token };
    }
    getAuths() {
        return 'Get all auth';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map