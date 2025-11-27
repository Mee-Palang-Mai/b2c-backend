import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthCookies } from 'src/types/auth-user.type';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register user & bind Cognito' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'User created & bound with Cognito',
  })
  @ApiResponse({ status: 400, description: 'Invalid data / Cognito failure' })
  async signup(@Body() body: SignupDto) {
    const {
      empId,
      empNo,
      username,
      password,
      empName,
      email,
      empLevel,
      teamId,
    } = body;

    const created = await this.authService.adminCreateUser(
      username,
      email ?? '',
    );
    await this.authService.setPassword(username, password);

    const sub = created.User?.Attributes?.find((a) => a.Name === 'sub')?.Value;

    if (!sub) {
      throw new BadRequestException('Cognito did not return sub');
    }

    const user = await this.userService.createUser({
      empId,
      empNo,
      username,
      password,
      empName,
      email,
      empLevel,
      teamId,
      cognitoSub: sub,
    });

    return {
      message: 'User created & bound with Cognito',
      user: this.userService.formatUser(user),
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with Cognito (creates cookies)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login ok - HttpOnly cookies set' })
  @ApiResponse({ status: 400, description: 'Bad username/password' })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { username, password } = body;

    const user = await this.userService.findByUsername(username);
    if (!user) throw new BadRequestException('User not found');

    if (!user.cognitoSub) {
      const created = await this.authService.adminCreateUser(
        username,
        user.email ?? '',
      );
      await this.authService.setPassword(username, password);

      const sub = created.User?.Attributes?.find(
        (a) => a.Name === 'sub',
      )?.Value;
      if (!sub) throw new BadRequestException('Cognito bind failed');

      await this.userService.updateCognitoSub(username, sub);
      user.cognitoSub = sub;
    }

    const auth = await this.authService.login(username, password);
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
      maxAge: 7 * 86400_000,
    });
    res.cookie('id_token', IdToken, { ...cookieOptions, maxAge: 3600_000 });

    return {
      message: 'Logged in successfully',
      user: {
        empNo: user.empNo,
        username: user.username,
        name: user.empName,
        role: user.empLevel,
        cognitoSub: user.cognitoSub,
      },
    };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token (uses refresh_token cookie)' })
  @ApiCookieAuth('cookieAuth')
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  @ApiResponse({ status: 401, description: 'Refresh token invalid' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies as AuthCookies;
    const refreshToken = cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const auth = await this.authService.refresh(refreshToken);
    const { AccessToken, IdToken } = auth.AuthenticationResult ?? {};

    if (!AccessToken || !IdToken) {
      throw new UnauthorizedException('Invalid refresh response');
    }

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
    res.cookie('id_token', IdToken, { ...cookieOptions, maxAge: 3600_000 });

    return { message: 'Token refreshed' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout (clears auth cookies)' })
  @ApiResponse({ status: 200, description: 'Cookies cleared' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    res.clearCookie('id_token', { path: '/' });
    return { message: 'Logged out' };
  }
}
