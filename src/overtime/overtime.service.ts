import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import {
  CreateOvertimeRequestDto,
  GetOvertimeRequestDto,
  UpdateOvertimeStatusDto,
} from './dto/dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OvertimeService {
  constructor(private prisma: PrismaService) {}

  async updateOvertimeStatus(requestId: number, dto: UpdateOvertimeStatusDto) {
    Logger.log(`Updating OT request ${requestId} with status ${dto.status}`);

    const result = await this.prisma.oTRequest.update({
      where: { requestId },
      data: {
        status: dto.status,
        approvalBy: dto.approvalBy,
        updateAt: new Date(),
      },
    });

    Logger.log(`OT request ${requestId} updated successfully`);
    Logger.debug(`Updated OT Request: ${JSON.stringify(result)}`);

    return result; // TODO: Implement this
  }

  async getTeamRequests(teamId: number) {
    try {
      Logger.log(`Fetching OT requests for team ${teamId}`);

      // Check team exists
      const team = await this.prisma.team.findUnique({
        where: { teamId },
      });

      if (!team) {
        throw new NotFoundException(`Team with id ${teamId} not found`);
      }

      Logger.log(
        `Team lookup result for teamId ${teamId}: ${JSON.stringify(team)}`,
      );

      const result = await this.prisma.oTRequest.findMany({
        where: {
          attendence: {
            user: {
              teamId: teamId,
            },
          },
        },
        include: {
          attendence: {
            include: {
              user: true,
            },
          },
        },
      });

      Logger.log(`Fetched ${result.length} OT requests for team ${teamId}`);
      Logger.debug(`OT Requests: ${JSON.stringify(result)}`);

      // If result is empty → also return 404
      if (result.length === 0) {
        throw new NotFoundException(`No OT requests found for team ${teamId}`);
      }
    } catch (error) {
      // Re-throw NestJS exceptions (BadRequest, NotFound)
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Unknown / unexpected errors
      console.error('Unexpected error in getTeamRequests:', error);
      throw new InternalServerErrorException('Failed to fetch team requests.');
    }
  }

  async createOvertimeRequest(dto: CreateOvertimeRequestDto) {
    // user มาจาก token ที่ AuthGuard decode ไว้แล้ว

    const now = new Date();

    Logger.log(`Creating OT request for attendenceId ${dto.attendenceId}`);

    const result = await this.prisma.oTRequest.create({
      data: {
        attendenceId: dto.attendenceId,
        note: dto.note || 'empty',
        status: 'PENDING',
        createAt: now,
        updateAt: now,
        deletedAt: 'NULL',
      },
    });

    Logger.log(
      `OT request created successfully for attendenceId ${dto.attendenceId}`,
    );
    Logger.debug(`Created OT Request: ${JSON.stringify(result)}`);

    return result;
  }

  async getrequestOvertime(attendenceId: number) {
    Logger.log(`Fetching OT requests for attendenceId ${attendenceId}`);

    try {
      const result = await this.prisma.oTRequest.findMany({
        where: {
          attendenceId: attendenceId,
        },
      });

      Logger.log(
        `Fetched ${result.length} OT requests for attendenceId ${attendenceId}`,
      );
      Logger.debug(`OT Requests: ${JSON.stringify(result)}`);

      if (result.length === 0) {
        throw new NotFoundException(
          `No OT requests found for attendenceId ${attendenceId}`,
        );
      }

      return result;
    } catch (error) {
      // Re-throw NestJS exceptions (BadRequest, NotFound)
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Unknown / unexpected errors
      console.error('Unexpected error in getTeamRequests:', error);
      throw new InternalServerErrorException('Failed to fetch team requests.');
    }
  }

  async getOvertimeById(otRequestId: number) {
    Logger.log(`Fetching OT request with id ${otRequestId}`);

    try {
      const result = await this.prisma.oTRequest.findUnique({
        where: {
          requestId: otRequestId,
        },
      });

      Logger.log(
        `Fetched OT request with id ${otRequestId}: ${JSON.stringify(result)}`,
      );

      if (!result) {
        throw new NotFoundException(
          `OT request with id ${otRequestId} not found`,
        );
      }
      return result;
    } catch (error) {
      // Re-throw NestJS exceptions (BadRequest, NotFound)
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Unknown / unexpected errors
      console.error('Unexpected error in getTeamRequests:', error);
      throw new InternalServerErrorException('Failed to fetch team requests.');
    }
  }
}
