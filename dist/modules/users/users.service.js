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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepositoryDB) {
        this.usersRepositoryDB = usersRepositoryDB;
    }
    async getUsers(page, limit) {
        const definedPage = page;
        const definedLimit = limit;
        const startIndex = (definedPage - 1) * definedLimit;
        const endIndex = startIndex + definedLimit;
        const allUsers = await this.usersRepositoryDB.find();
        const paginatedUsers = allUsers.slice(startIndex, endIndex);
        const withoutPassword = paginatedUsers.map(({ password, ...user }) => user);
        return withoutPassword;
    }
    async getUserById(id) {
        return this.usersRepositoryDB.findOne({
            where: { id },
            relations: ['orders'],
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                country: true,
                address: true,
                city: true,
                orders: {
                    id: true,
                    date: true,
                },
            },
        });
    }
    async createUser(user) {
        const usercreated = this.usersRepositoryDB.create(user);
        await this.usersRepositoryDB.save(usercreated);
        const { password, ...data } = usercreated;
        return data;
    }
    async modifiedUser(id, user) {
        const userToModify = await this.usersRepositoryDB.findOne({
            where: { id },
        });
        if (!userToModify) {
            return null;
        }
        Object.assign(userToModify, user);
        const modified = await this.usersRepositoryDB.save(userToModify);
        const { password, ...withoutPassword } = modified;
        return withoutPassword;
    }
    async deleteUser(id) {
        const user = await this.usersRepositoryDB.findOne({ where: { id } });
        if (!user) {
            return null;
        }
        await this.usersRepositoryDB.delete({ id });
        return { message: 'User deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map