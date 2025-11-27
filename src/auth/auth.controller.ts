import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthCookies } from 'src/types/auth-user.type';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register user & bind Cognito' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201 })
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with Cognito (creates cookies)' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { cookies, user } = await this.authService.login(body);
    this.authService.setAuthCookies(res, cookies);

    return { message: 'Logged in successfully', user };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies as AuthCookies;

    const refreshToken = cookies.refresh_token;
    const idToken = cookies.id_token;

    const result = await this.authService.refresh(refreshToken, idToken);
    this.authService.setAuthCookies(res, result.cookies);

    return { message: 'Token refreshed' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.clearAuthCookies(res);
    return { message: 'Logged out' };
  }
}
