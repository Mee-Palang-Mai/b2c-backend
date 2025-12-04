import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ConfirmForgotPasswordDto {
  @ApiProperty({ example: 'admin@company.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ example: '123456!' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  newPassword: string;
}
