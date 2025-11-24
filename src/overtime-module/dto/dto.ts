import { IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateOvertimeRequestDto {
  @IsNotEmpty()
  @IsDateString()
  date: string; // วันที่ทำ OT

  @IsNotEmpty()
  @IsString()
  startTime: string; // เวลาเริ่ม เช่น "18:00"

  @IsNotEmpty()
  @IsString()
  endTime: string; // เวลาจบ เช่น "21:00"

  @IsOptional()
  @IsString()
  reason?: string; // เหตุผลการทำ OT

  @IsOptional()
  @IsNumber()
  projectId?: number; // ถ้ามีการผูก project
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
