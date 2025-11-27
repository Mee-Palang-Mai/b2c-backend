// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../database/prisma.service';
// import { CreateOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';

// @Injectable()
// export class OtService {
//   constructor(private prisma: PrismaService) {}

//   async createOtRequest(dto: CreateOvertimeRequestDto, empId: number) {
//     const now = new Date();

//     await this.prisma.oT.create({
//       data: {
//         empId: empId,
//         otTime: dto.time,
//         createDate: now,
//         updateDate: now,
//       },
//     });

//     return await this.prisma.extraPayRequest.create({
//       data: {
//         empId: dto.id,
//         extrapayTypeID: '001', // รหัส OT
//         startDate: now,
//         endDate: now,
//         startTime: now,
//         endTime: now,
//         note: 'OT Auto Request',
//         status: 'PENDING',
//         createDate: now,
//         updateDate: now,
//       },
//     });
//   }

//   async getOtRequestsByEmpId(empId: number) {
//     return await this.prisma.extraPayRequest.findMany({
//       where: {
//         empId,
//         extrapayTypeID: '001', // รหัส OT,
//       },
//     });
//   }

//   async getOtRequestsByRequestId(requestsId: number) {
//     return await this.prisma.extraPayRequest.findUnique({
//       where: {
//         requestsId,
//         extrapayTypeID: '001', // รหัส OT,
//       },
//     });
//   }

//   async getOtRequestsTeam(teamId: number) {
//     // 1) หา user ทั้งหมดในทีม
//     const teamMembers = await this.prisma.user.findMany({
//       where: { teamId },
//       select: { empId: true },
//     });

//     const empIds = teamMembers.map((u) => u.empId);

//     // 2) หา OT ของทุก empId
//     return this.prisma.extraPayRequest.findMany({
//       where: {
//         extrapayTypeID: '001', // รหัส OT,
//         empId: { in: empIds },
//       },
//     });
//   }

//   async updateOvertimeStatus(requestId: number, dto: UpdateOvertimeStatusDto) {
//     return await this.prisma.extraPayRequest.update({
//       where: { requestId },
//       data: {
//         status: dto.status,
//         approveBy: dto.approvalBy,
//         managerNote: dto.managerNote,
//         updateDate: new Date(),
//       },
//     });
//   }
// }
