import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { AuthUser } from 'src/types/auth-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest<{ user?: AuthUser }>();

    const user = req.user;
    if (!user) {
      throw new ForbiddenException('No user context');
    }

    if (!user.empLevel) {
      throw new ForbiddenException('No role assigned');
    }

    if (!requiredRoles.includes(user.empLevel)) {
      throw new ForbiddenException(
        `Required role: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
