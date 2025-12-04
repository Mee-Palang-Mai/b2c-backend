import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateOvertimeRequestDto {
  @IsNumber()
  @IsNotEmpty()
  attendenceId: number; // attendenceId

  @IsString()
  note: string; // note
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

  @IsString()
  approvalBy?: string;
}

export class GetOvertimeRequestDto {
  @IsNumber()
  @IsNotEmpty()
  attendenceId: number; // attendenceId
}
