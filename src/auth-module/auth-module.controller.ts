import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthModuleService } from './auth-module.service';

@Controller('/auth')
export class AuthModuleController {
  constructor(private authModuleService: AuthModuleService) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; email: string; password: string },
  ) {
    await this.authModuleService.adminCreateUser(body.username, body.email);
    await this.authModuleService.setPassword(body.username, body.password);
    return { message: 'User created' };
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const auth = await this.authModuleService.login(
        body.username,
        body.password,
      );
      const { AccessToken, RefreshToken, IdToken } =
        auth.AuthenticationResult ?? {};

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
        path: '/',
      };

      res.cookie('access_token', AccessToken, {
        ...cookieOptions,
        maxAge: 3600_000,
      });

      res.cookie('refresh_token', RefreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 3600_000,
      });

      res.cookie('id_token', IdToken, {
        ...cookieOptions,
        maxAge: 3600_000,
      });

      return { message: 'Logged in' };
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;

      const message =
        typeof e.message === 'string' ? e.message : 'Unknown error';

      const code = typeof e.code === 'string' ? e.code : undefined;

      throw new BadRequestException({ message, code });
    }
  }

  @Post('refresh')
  refresh(
    @Body()
    body: {
      refreshToken: string;
      cognitoUsernameForHash?: string;
    },
  ) {
    return this.authModuleService.refresh(
      body.refreshToken,
      body.cognitoUsernameForHash,
    );
  }
}
