import { Injectable } from '@nestjs/common';
import { CreateOvertimeRequestDto, GetOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OvertimeService {
  constructor(private prisma: PrismaService) {}

  async updateOvertimeStatus(requestId: number, dto: UpdateOvertimeStatusDto) {

    const result = await this.prisma.oTRequest.update({
      where: { requestId },
      data: {
        status: dto.status,
        approvalBy: dto.approvalBy,
        updateAt: new Date(),
      },
    });

    return result; // TODO: Implement this
  }

async getTeamRequests(teamId: number) {
  // 1) หา user ทั้งหมดในทีม
  const teamMembers = await this.prisma.user.findMany({
    where: { teamId },
    select: { empId: true },
  });

  const empIds = teamMembers.map((u) => u.empId);

  if (empIds.length === 0) {
    return []; // ไม่มีคนในทีม
  }

  // 2) หา attendance ของทุก empId
  const teamAttendence = await this.prisma.attendence.findMany({
    where: {
      empId: { in: empIds },
    },
    select: { attendenceId: true },
  });

  const attendenceIds = teamAttendence.map((a) => a.attendenceId);

  if (attendenceIds.length === 0) {
    return []; // ไม่มี attendance ของทีม
  }

  // 3) หา OTRequest ของทุก attendenceId
  const result = await this.prisma.oTRequest.findMany({
    where: {
      attendenceId: { in: attendenceIds },
    },
    include: {
      attendence: true, // ถ้าอยากดูข้อมูล attendance ด้วย
    },
  });

  return result;
}

  async createOvertimeRequest(dto: CreateOvertimeRequestDto) {
    // user มาจาก token ที่ AuthGuard decode ไว้แล้ว

    const now = new Date();

    const result = await this.prisma.oTRequest.create({
      data: {
        attendenceId: dto.attendenceId,
        note: dto.note || "empty",
        status: 'PENDING',
        createAt: now,
        updateAt: now,
        deletedAt: "NULL",
      },
    });

    return result;
  }

  async getrequestOvertime(dto: GetOvertimeRequestDto) {

      const result = await this.prisma.oTRequest.findMany({
      where: {
        attendenceId: dto.attendenceId,
      },
    });

    return result; // TODO: Implement this
  }

  async getOvertimeById(otRequestId: number) {
    const result = await this.prisma.extraPayRequest.findUnique({
      where: {
        requestId: otRequestId,
      },
    });

      return result; // TODO: Implement this
  }
}
