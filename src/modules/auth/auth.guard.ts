import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('La autorización es requerida');
    }
    const basicPrefix = 'Basic:';
    if (!authHeader.startsWith(basicPrefix)) {
      throw new UnauthorizedException('Formato invalido');
    }
    const credential = authHeader.slice(basicPrefix.length);
    const [email, password] = credential.split(':');
    if (!email || !password) {
      throw new UnauthorizedException(
        'Invalid Authorization structure. Expected "Basic: <email>:<password>"',
      );
    }
    return true;
  }
}
