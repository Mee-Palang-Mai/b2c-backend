import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@company.com' })
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  password: string;
}
