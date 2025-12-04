import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateLeaveRequestDto, UpdateLeaveStatusDto } from './dto/dto';

@Injectable()
export class LeaveService {
    constructor(private prisma: PrismaService) {}

async deleteLeaveRequest(id: string) {
  try {
    const existing = await this.prisma.leaveRequest.findUnique({
      where: { requestId: id },
    });

    if (!existing) {
      throw new NotFoundException(`Leave Request with id ${id} not found`);
    }

    const result = await this.prisma.leaveRequest.delete({
      where: { requestId: id },
    });

    Logger.log(`Leave request ${id} deleted successfully`);
    return {
      message: `Leave request ${id} deleted successfully`,
      deleted: result,
    };

  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }

    console.error("Unexpected error while deleting leave request:", error);
    throw new InternalServerErrorException("Failed to delete leave request.");
  }
}

async putLeaveRequestStatus(
  id: string,
  dto: UpdateLeaveStatusDto,
) {

  const exists = await this.prisma.leaveRequest.findUnique({
    where: { requestId: id },
  });

  if (!exists) {
    throw new NotFoundException(`Leave request ID ${id} not found`);
  }

  const result = await this.prisma.leaveRequest.update({
    where: { requestId: id },
    data: {
      status: dto.status,
      note: dto.note ?? exists.note,
      approvalBy: dto.approvalBy ?? exists.approvalBy,
      updateAt: new Date(),
    },
  });

  return {
    message: "Leave request updated successfully",
    data: result,
  };
}

async postLeaveRequest(dto: CreateLeaveRequestDto) {
  try {
    Logger.log(`Creating Leave Request for employee ${dto.empId}`);

    const now = new Date();

    const result = await this.prisma.leaveRequest.create({
      data: {
        empId: dto.empId,
        leaveTypeId: dto.leaveTypeId,
        leaveCount: dto.leaveCount ?? null,
        note: dto.note ?? "",
        status: "PENDING",              // ค่าตั้งต้น
        approvalBy: null,
        startDateTime: dto.startDateTime,
        endDateTime: dto.endDateTime,
        createAt: now,
        updateAt: now,
        deletedAt: null,
      },
    });

    Logger.log(`Leave Request created successfully`);
    Logger.debug(`Created Leave Request: ${JSON.stringify(result)}`);

    return result;

  } catch (error) {
    console.error("Error creating Leave Request:", error);
    throw new InternalServerErrorException("Failed to create leave request");
  }
}

  async getLeaveTeamRequest(teamId: string) {
  try {
    Logger.log(`Fetching Leave requests for team ${teamId}`);

    const team = await this.prisma.team.findUnique({
      where: { teamId },
    });

    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    Logger.log(
      `Team lookup result for teamId ${teamId}: ${JSON.stringify(team)}`,
    );

    const result = await this.prisma.leaveRequest.findMany({
      where: {
        user: {
          teamId: teamId,
        },
      },
      include: {
        user: true,
        leaveType: true,
      },
    });

    Logger.log(`Fetched ${result.length} leave requests for team ${teamId}`);
    Logger.debug(`Leave Requests: ${JSON.stringify(result)}`);

    if (result.length === 0) {
      throw new NotFoundException(
        `No leave requests found for team ${teamId}`,
      );
    }

    return result;
  } catch (error) {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    console.error('Unexpected error in getLeaveTeamRequest:', error);
    throw new InternalServerErrorException('Failed to fetch team leave requests.');
  }
}

  async getLeaveById(id: string) {
  try {
    const result = await this.prisma.leaveRequest.findUnique({
      where: { requestId: id },
      include: {
        user: true,
        leaveType: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`Leave request with id ${id} not found`);
    }

    return result;

  } catch (error) {
    console.error('Error in getLeaveById:', error);

    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException(
      `Failed to fetch leave request id ${id}`,
    );
  }
}

async getLeaveRequest(user: string) {
  try {
    const empId = user;

    const result = await this.prisma.leaveRequest.findMany({
      where: { empId },
      orderBy: { createAt: 'desc' },
      include: {
        leaveType: true,
        user: {
          select: {
            empId: true,
            name: true,
            teamId: true,
          },
        },
      },
    });

    if (result.length === 0) {
      throw new NotFoundException(
        `No leave requests found for user ${empId}.`,
      );
    }

    return result;
  } catch (error) {
    console.error('Error fetching leave request history:', error);

    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException(
      'Failed to fetch leave request history',
    );
  }
}


async getLeaveType() {
  try {
    const result = await this.prisma.leaveType.findMany({
      orderBy: { typeName: 'asc' },
    });

    if (result.length === 0) {
      throw new NotFoundException('No leave types found.');
    }

    return result;
  } catch (error) {
    console.error('Error fetching leave types:', error);

    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException('Failed to fetch leave types');
  }
}

}
