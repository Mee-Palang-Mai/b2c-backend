import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@company.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  password: string;
}
