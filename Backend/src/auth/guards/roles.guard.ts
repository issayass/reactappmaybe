import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { _Role } from '@/user-management/enums/role-enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<_Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const role = request.user.userRole;

    if (!role) {
      throw new ForbiddenException('User not authenticated or role not found');
    }

    const hasRole = () => roles.includes(role);
    if (!hasRole()) {
      throw new ForbiddenException(
        'You do not have the necessary permissions to access this resource',
      );
    }

    return true;
  }
}