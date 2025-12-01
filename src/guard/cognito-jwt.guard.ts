import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from '../user/user.service';
import { CognitoJwtService } from 'src/auth/cognito-jwt.service';
import { AuthUser } from 'src/types/auth-user.type';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: CognitoJwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();

    const token = this.extractAccessToken(req);

    if (!token) {
      throw new UnauthorizedException('Access token missing');
    }

    const payload = await this.jwtService.verifyToken(token);

    const cognitoSub = payload.sub;

    if (!cognitoSub) {
      throw new UnauthorizedException('Invalid token payload (no sub)');
    }

    const user = await this.userService.findByCognitoSub(cognitoSub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = {
      empId: user.empId,
      empNo: user.empNo,
      username: user.username,
      empLevel: user.empLevel ?? undefined,
      cognitoSub: user.cognitoSub,
      jwt: payload,
    };

    return true;
  }

  private extractAccessToken(req: Request): string | null {
    const auth = req.headers['authorization'];
    if (auth?.startsWith('Bearer ')) {
      return auth.slice(7);
    }

    const cookies = req.cookies as Record<string, string> | undefined;
    return cookies?.access_token ?? null;
  }
}
