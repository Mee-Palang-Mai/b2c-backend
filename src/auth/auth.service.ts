import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';

import { CognitoService } from './cognito.service';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthCookies } from 'src/types/auth-user.type';
import * as jwt from 'jsonwebtoken';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ConfirmForgotPasswordDto } from './dto/confirmForgotPassword.dto';

function decodeUsernameFromIdToken(idToken: string): string {
  const decoded = jwt.decode(idToken) as { [k: string]: unknown } | null;

  if (!decoded || typeof decoded !== 'object') {
    throw new Error('Invalid id_token');
  }

  const username = decoded['cognito:username'];

  if (typeof username !== 'string') {
    throw new Error('cognito:username missing in token');
  }

  return username;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly cognito: CognitoService,
    private readonly userService: UserService,
  ) {}

  private readonly cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    path: '/',
  };

  async signup(dto: SignupDto) {
    const { username, password, email } = dto;
    let cognitoCreated = false;

    try {
      const { sub } = await this.cognito.adminCreateUserWithSub(
        username,
        email ?? '',
      );

      cognitoCreated = true;

      if (!sub) {
        throw new BadRequestException('Cognito did not return user id');
      }

      await this.cognito.setPassword(username, password);

      const user = await this.userService.createUser({
        ...dto,
        cognitoSub: sub,
      });

      return {
        message: 'User created & bound with Cognito',
        user: this.userService.formatUser(user),
      };
    } catch (err) {
      if (cognitoCreated) {
        await this.cognito.deleteUser(username);
      }

      this.throwAuthError(err);
    }
  }

  async login(dto: LoginDto) {
    try {
      const { username, password } = dto;

      const user = await this.userService.findByUsername(username);
      if (!user) throw new BadRequestException('User not found');

      const loginUsername = user.email ?? user.username;

      if (!user.cognitoSub) {
        const { sub } = await this.cognito.adminCreateUserWithSub(
          loginUsername,
          loginUsername,
        );

        if (!sub) throw new BadRequestException('Cognito bind failed');

        await this.cognito.setPassword(loginUsername, password);
        await this.userService.updateCognitoSub(loginUsername, sub);

        user.cognitoSub = sub;
      }

      const auth = await this.cognito.login(loginUsername, password);
      const result = auth.AuthenticationResult;

      if (!result?.AccessToken || !result?.RefreshToken || !result?.IdToken) {
        throw new UnauthorizedException('Cognito authentication failed');
      }

      return {
        cookies: {
          access_token: result.AccessToken,
          refresh_token: result.RefreshToken,
          id_token: result.IdToken,
        } satisfies AuthCookies,

        user: {
          empNo: user.empNo,
          username: user.username,
          name: user.name,
          role: user.empLevel,
          cognitoSub: user.cognitoSub,
        },
      };
    } catch (err) {
      this.throwAuthError(err);
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const { username } = dto;

      const user = await this.userService.findByUsername(username);
      if (!user) throw new BadRequestException('User not found');

      const forgotPasswordUsername = user.email ?? user.username;

      return await this.cognito.forgotPassword(forgotPasswordUsername);
    } catch (err) {
      this.throwAuthError(err);
    }
  }

  async confirmForgotPassword(dto: ConfirmForgotPasswordDto) {
    try {
      const { username, code, newPassword } = dto;

      const user = await this.userService.findByUsername(username);
      if (!user) throw new BadRequestException('User not found');

      const forgotPasswordUsername = user.email ?? user.username;

      return await this.cognito.confirmForgotPassword(
        forgotPasswordUsername,
        code,
        newPassword,
      );
    } catch (err) {
      this.throwAuthError(err);
    }
  }

  async refresh(refreshToken?: string, idToken?: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token missing');
      }

      if (!idToken) {
        throw new UnauthorizedException('id_token missing');
      }

      const cognitoUsername = decodeUsernameFromIdToken(idToken);

      const auth = await this.cognito.refresh(refreshToken, cognitoUsername);
      const result = auth.AuthenticationResult;

      if (!result?.AccessToken || !result?.IdToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        cookies: {
          access_token: result.AccessToken,
          id_token: result.IdToken,
        },
      };
    } catch (err) {
      this.throwAuthError(err);
    }
  }

  setAuthCookies(res: Response, cookies: Partial<AuthCookies>) {
    if (cookies.access_token) {
      res.cookie('access_token', cookies.access_token, {
        ...this.cookieOptions,
        maxAge: 3600_000,
      });
    }

    if (cookies.refresh_token) {
      res.cookie('refresh_token', cookies.refresh_token, {
        ...this.cookieOptions,
        maxAge: 7 * 86400_000,
      });
    }

    if (cookies.id_token) {
      res.cookie('id_token', cookies.id_token, {
        ...this.cookieOptions,
        maxAge: 3600_000,
      });
    }
  }

  clearAuthCookies(res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    res.clearCookie('id_token', { path: '/' });
  }

  private throwAuthError(err: unknown): never {
    const message =
      err instanceof Error ? err.message : 'Authentication failed';

    if (message.includes('Unique constraint failed')) {
      if (message.includes('Emp_ID')) {
        throw new BadRequestException('Employee ID already exists');
      }

      if (message.includes('username')) {
        throw new BadRequestException('Username already exists');
      }

      throw new BadRequestException('Duplicate value exists');
    }

    if (message.includes('InvalidParameterException')) {
      throw new BadRequestException(message.replace(/^.*?:\s*/, ''));
    }

    if (message.includes('NotAuthorizedException')) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (message.includes('UsernameExistsException')) {
      throw new BadRequestException('Email already exists in Cognito');
    }

    if (message.includes('UserNotFoundException')) {
      throw new BadRequestException('User not found in Cognito');
    }

    throw new BadRequestException(message);
  }
}
