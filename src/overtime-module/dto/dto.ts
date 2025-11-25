import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, IsEnum, IsInt } from 'class-validator';

export class CreateOvertimeRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;   // empId

  @IsNumber()
  @IsNotEmpty()
  time: number; // otTime
}

export enum OvertimeStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateOvertimeStatusDto {
  @IsNotEmpty()
  @IsEnum(OvertimeStatus)
  status: OvertimeStatus;

  @IsOptional()
  @IsString()
  managerNote?: string; // หมายเหตุจากหัวหน้า
}
