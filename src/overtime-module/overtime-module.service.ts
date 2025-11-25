import { Injectable } from '@nestjs/common';
import {CreateOvertimeRequestDto,UpdateOvertimeStatusDto} from './dto/dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OvertimeModuleService {
    updateOvertimeStatus(id: string, dto: UpdateOvertimeStatusDto) {
      throw new Error('Method not implemented.');
    }
    getTeamRequests() {
      return "This action returns all overtime requests";
    }

    createOvertimeRequest(dto: CreateOvertimeRequestDto) {
        const otService = new OtService(new PrismaService());
        return otService.createOtRequest(dto);
    }

    getrequestOvertime() {
        return "This action returns all overtime requests";
    }

    getOvertimeById(id: string) {
        const otService = new OtService(new PrismaService());
        return otService.getOtRequestsByEmpId(id);
    }
}

class OtService {
  constructor(private prisma: PrismaService) {}

  async createOtRequest(dto: CreateOvertimeRequestDto) {
    const now = new Date();

    return await this.prisma.oT.create({
      data: {
        empId: dto.id,
        otTime: dto.time,
        createDate: now,
        updateDate: now,
      },
    });
  }

  async getOtRequestsByEmpId(empId: string) {
    return await this.prisma.oT.findMany({
      where: { empId },
    });
  }
}