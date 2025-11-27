import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateOvertimeRequestDto {
  @IsString()
  @IsNotEmpty()
  id: number; // empId

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

  @IsOptional()
  @IsNumber()
  approvalBy?: number;
}
