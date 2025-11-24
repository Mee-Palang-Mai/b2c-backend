import { Injectable } from '@nestjs/common';
import {CreateOvertimeRequestDto,UpdateOvertimeStatusDto} from './dto/dto';

@Injectable()
export class OvertimeModuleService {
    updateOvertimeStatus(id: string, dto: UpdateOvertimeStatusDto) {
      throw new Error('Method not implemented.');
    }
    getTeamRequests() {
      return "This action returns all overtime requests";
    }

    createOvertimeRequest(dto: CreateOvertimeRequestDto) {
        throw new Error('Method not implemented.');
    }

    getrequestOvertime() {
        return "This action returns all overtime requests";
    }

    getOvertimeById(id: string) {
        throw new Error('Method not implemented.');
    }
}
