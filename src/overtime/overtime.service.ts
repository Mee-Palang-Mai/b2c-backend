import { Injectable } from '@nestjs/common';
import { CreateOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';

@Injectable()
export class OvertimeService {
  constructor() {}

  updateOvertimeStatus(requestId: number, dto: UpdateOvertimeStatusDto) {
    return 'updateOvertimeStatus'; // TODO: Implement this
  }
  getTeamRequests(teamId: number) {
    return 'getTeamRequests'; // TODO: Implement this
  }

  createOvertimeRequest(dto: CreateOvertimeRequestDto, user: any) {
    // user มาจาก token ที่ AuthGuard decode ไว้แล้ว
    return 'createOvertimeRequest'; // TODO: Implement this
  }

  getrequestOvertime(user: any) {
    return 'getrequestOvertime'; // TODO: Implement this
  }

  getOvertimeById(otId: number) {
    return 'getOvertimeById'; // TODO: Implement this
  }
}
