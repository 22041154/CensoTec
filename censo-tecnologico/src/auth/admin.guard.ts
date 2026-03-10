import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user && user.role === 'admin') { 
      return true;
    }
    throw new ForbiddenException('No tienes permisos de administrador');
  }
}