import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 1001 })
  @IsNumber()
  empId: string;

  @ApiProperty({ example: 'EMP001' })
  @IsString()
  @IsNotEmpty()
  empNo: string;

  @ApiProperty({ example: 'admin@company.com' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@company.com' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  empLevel?: string;

  @ApiProperty({ example: 'IT01' })
  @IsString()
  teamId?: string;
}
