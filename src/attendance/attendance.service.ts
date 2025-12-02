import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { AuthUser } from 'src/types/auth-user.type';
import { UserRole } from 'src/emum/user.enum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private get WORK_START_TIME(): string {
    return this.configService.get<string>(
      'ATTENDANCE_WORK_START_TIME',
      '09:00',
    );
  }

  private get WORK_END_TIME(): string {
    return this.configService.get<string>('ATTENDANCE_WORK_END_TIME', '18:00');
  }

  private get ALLOWED_EARLY_CHECKIN_MINUTES(): number {
    return this.configService.get<number>(
      'ATTENDANCE_ALLOWED_EARLY_CHECKIN_MINUTES',
      15,
    );
  }

  async checkIn(user: AuthUser, dto: CheckInDto) {
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');

    // 1. Check if already checked in today
    const existingAttendance = await this.prisma.attendence.findFirst({
      where: {
        empId: user.empId,
        checkInDatetime: {
          gte: dayjs(today).toDate(),
          lt: dayjs(today).add(1, 'day').toDate(),
        },
      },
    });

    if (existingAttendance) {
      throw new BadRequestException('You have already checked in today.');
    }

    // 2. Check 15 minutes rule
    const [startHour, startMinute] =
      this.WORK_START_TIME.split(':').map(Number);
    const workStart = dayjs(today)
      .hour(startHour)
      .minute(startMinute)
      .second(0);
    const allowedStart = workStart.subtract(
      this.ALLOWED_EARLY_CHECKIN_MINUTES,
      'minute',
    );

    if (now.isBefore(allowedStart)) {
      throw new BadRequestException(
        `You can only check in ${this.ALLOWED_EARLY_CHECKIN_MINUTES} minutes before work start time (${this.WORK_START_TIME}).`,
      );
    }

    return this.prisma.attendence.create({
      data: {
        empId: user.empId,
        placeId: dto.placeId,
        checkInLatitude: dto.latitude,
        checkInlongitude: dto.longitude,
        checkInDatetime: now.toDate(),
        status: 'CHECKED_IN',
        isOt: false, // Default not OT
      },
    });
  }

  async checkOut(user: AuthUser, dto: CheckOutDto) {
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');

    // 1. Find active check-in
    const attendance = await this.prisma.attendence.findFirst({
      where: {
        empId: user.empId,
        checkInDatetime: {
          gte: dayjs(today).toDate(),
        },
        checkOutDatetime: null,
      },
      orderBy: {
        checkInDatetime: 'desc',
      },
    });

    if (!attendance) {
      throw new BadRequestException('No active check-in found for today.');
    }

    // 2. Validate work end time
    // "All Employees cannot check out before the end of work hours."
    const [endHour, endMinute] = this.WORK_END_TIME.split(':').map(Number);
    const workEnd = dayjs(today).hour(endHour).minute(endMinute).second(0);

    if (now.isBefore(workEnd)) {
      throw new BadRequestException(
        `Cannot check out before work end time (${this.WORK_END_TIME}).`,
      );
    }

    return this.prisma.attendence.update({
      where: { attendenceId: attendance.attendenceId },
      data: {
        checkOutlatitude: dto.latitude,
        checkOutlongitude: dto.longitude,
        checkOutDatetime: now.toDate(),
        status: 'CHECKED_OUT',
        isOt: dto.isOt,
      },
    });
  }

  async getMyAttendance(user: AuthUser) {
    return this.prisma.attendence.findMany({
      where: { empId: user.empId },
      orderBy: { createAt: 'desc' },
      include: { place: true },
    });
  }

  async getAllAttendance(user: AuthUser) {
    // Admin sees all
    if (user.empLevel === UserRole.ADMIN) {
      return this.prisma.attendence.findMany({
        orderBy: { createAt: 'desc' },
        include: { user: true, place: true },
      });
    }

    // Supervisor sees own team + own
    if (user.empLevel === UserRole.SUPERVISOR) {
      // Get user's team
      const currentUser = await this.prisma.user.findUnique({
        where: { empId: user.empId },
        select: { teamId: true },
      });

      if (!currentUser?.teamId) {
        // If no team, maybe just own?
        return this.getMyAttendance(user);
      }

      return this.prisma.attendence.findMany({
        where: {
          OR: [
            { empId: user.empId }, // Own
            { user: { teamId: currentUser.teamId } }, // Team members
          ],
        },
        orderBy: { createAt: 'desc' },
        include: { user: true, place: true },
      });
    }

    throw new ForbiddenException(
      'You do not have permission to view all attendance.',
    );
  }
}
