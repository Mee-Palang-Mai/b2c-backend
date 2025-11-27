import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 1001 })
  empId: number;

  @ApiProperty({ example: 'EMP001' })
  empNo: string;

  @ApiProperty({ example: 'admin@company.com' })
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  empName: string;

  @ApiProperty({ example: 'admin@company.com' })
  email?: string;

  @ApiProperty({ example: 'ADMIN' })
  empLevel?: string;

  @ApiProperty({ example: 'IT01' })
  teamId?: string;
}
