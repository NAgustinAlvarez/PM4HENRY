/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Token not found',
        error: 'Unauthorized',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Creamos el objeto con la información del token
      const tokenInfo = {
        expiresIn: payload.exp ? new Date(payload.exp * 1000) : null,
        issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
      };

      // Console.log con la información del token
      console.log('Información del Token:', {
        expiresIn: tokenInfo.expiresIn?.toLocaleString() || 'No definido',
        issuedAt: tokenInfo.issuedAt?.toLocaleString() || 'No definido',
        timeRemaining: tokenInfo.expiresIn
          ? (() => {
              const totalSeconds = Math.max(
                0,
                (tokenInfo.expiresIn.getTime() - Date.now()) / 1000,
              );
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = Math.floor(totalSeconds % 60);
              return `${hours}h ${minutes}m ${seconds}s restantes`;
            })()
          : 'No definido',
      });

      // Adjuntamos el payload y la información del token a la request
      request['user'] = {
        ...payload,
        tokenInfo,
      };
    } catch (error) {
      let message = 'Invalid token';
      if (error.name === 'TokenExpiredError') {
        message = 'Token expired';
      } else if (error.name === 'JsonWebTokenError') {
        message = 'Malformed token';
      }

      throw new UnauthorizedException({
        statusCode: 401,
        message,
        error: 'Unauthorized',
        expiredAt:
          error.name === 'TokenExpiredError' ? error.expiredAt : undefined,
      });
    }

    return true;
  }
}
