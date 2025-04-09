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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message: 'Token not found',
                error: 'Unauthorized',
            });
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            const tokenInfo = {
                expiresIn: payload.exp ? new Date(payload.exp * 1000) : null,
                issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
            };
            console.log('Información del Token:', {
                expiresIn: tokenInfo.expiresIn?.toLocaleString() || 'No definido',
                issuedAt: tokenInfo.issuedAt?.toLocaleString() || 'No definido',
                timeRemaining: tokenInfo.expiresIn
                    ? (() => {
                        const totalSeconds = Math.max(0, (tokenInfo.expiresIn.getTime() - Date.now()) / 1000);
                        const hours = Math.floor(totalSeconds / 3600);
                        const minutes = Math.floor((totalSeconds % 3600) / 60);
                        const seconds = Math.floor(totalSeconds % 60);
                        return `${hours}h ${minutes}m ${seconds}s restantes`;
                    })()
                    : 'No definido',
            });
            request['user'] = {
                ...payload,
                tokenInfo,
            };
        }
        catch (error) {
            let message = 'Invalid token';
            if (error.name === 'TokenExpiredError') {
                message = 'Token expired';
            }
            else if (error.name === 'JsonWebTokenError') {
                message = 'Malformed token';
            }
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message,
                error: 'Unauthorized',
                expiredAt: error.name === 'TokenExpiredError' ? error.expiredAt : undefined,
            });
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map