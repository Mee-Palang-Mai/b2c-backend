import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { CognitoAuthGuard } from 'src/guard/cognito-jwt.guard';
import { AuthUser } from 'src/types/auth-user.type';

@Controller('attendance')
@UseGuards(CognitoAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  async checkIn(@Request() req: { user: AuthUser }, @Body() dto: CheckInDto) {
    return this.attendanceService.checkIn(req.user, dto);
  }

  @Post('check-out')
  async checkOut(@Request() req: { user: AuthUser }, @Body() dto: CheckOutDto) {
    return this.attendanceService.checkOut(req.user, dto);
  }

  @Get('me')
  async getMyAttendance(@Request() req: { user: AuthUser }) {
    return this.attendanceService.getMyAttendance(req.user);
  }

  @Get()
  async getAllAttendance(@Request() req: { user: AuthUser }) {
    return this.attendanceService.getAllAttendance(req.user);
  }
}
