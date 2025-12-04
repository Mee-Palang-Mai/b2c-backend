import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateLeaveStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  approvalBy?: string;
}

export class CreateLeaveRequestDto {
  empId: string;
  leaveTypeId: string;
  leaveCount?: number;
  note?: string;
  startDateTime: Date;
  endDateTime: Date;
}

