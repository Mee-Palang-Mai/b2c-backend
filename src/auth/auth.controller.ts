import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthCookies } from 'src/types/auth-user.type';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ConfirmForgotPasswordDto } from './dto/confirmForgotPassword.dto';

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

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send reset password code (OTP)' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset code sent successfully',
  })
  @ApiResponse({ status: 400, description: 'User does not exist' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);

    return {
      message: 'Reset code has been sent to your email or phone number',
    };
  }

  @Post('confirm-forgot-password')
  @ApiOperation({ summary: 'Confirm password reset using OTP' })
  @ApiBody({ type: ConfirmForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password has been reset successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  async confirmForgotPassword(@Body() dto: ConfirmForgotPasswordDto) {
    await this.authService.confirmForgotPassword(dto);

    return {
      message: 'Password changed successfully. Please login again.',
    };
  }
}
