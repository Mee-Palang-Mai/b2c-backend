import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get('types')
  getLeaveTypes() {
    return this.leaveService.getLeaveTypes();
  }

  @Get('requests')
  getLeaveRequests() {
    return this.leaveService.getLeaveRequests();
  }

  @Get()
  getLeave() {
    return this.leaveService.getLeave();
  }

  @Get(':id')
  getLeaveById(@Param('id') id: string) {
    return this.leaveService.getLeaveById(id);
  }

  @Post('requests')
  postLeaveRequests() {
    return this.leaveService.postLeaveRequests();
  }

  @Put('requests/:id/status')
  putLeaveRequests(@Param('id') id: string, @Body() dto: any) {
    return this.leaveService.putLeaveRequests(id, dto);
  }

  @Delete('requests/:id')
  deleteLeaveRequests(@Param('id') id: string) {
    return this.leaveService.deleteLeaveRequests(id);
  }
}
