import { Injectable } from '@nestjs/common';
import { CreateOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';
import { OtService } from './overtime-function.service';

@Injectable()
export class OvertimeModuleService {
  constructor(private otService: OtService) {}

  updateOvertimeStatus(otId: number, dto: UpdateOvertimeStatusDto) {
    return this.otService.updateOvertimeStatus(otId, dto);
  }
  getTeamRequests(teamId: number) {
    return this.otService.getOtRequestsTeam(teamId);
  }

  async createOvertimeRequest(dto: CreateOvertimeRequestDto, user: any) {
    // user มาจาก token ที่ AuthGuard decode ไว้แล้ว
    return this.otService.createOtRequest(dto, user.empId);
  }

  getrequestOvertime(user: any) {
    return this.otService.getOtRequestsByEmpId(user.empId);
  }

  getOvertimeById(otId: number) {
    return this.otService.getOtRequestsByRequestId(otId);
  }
}
