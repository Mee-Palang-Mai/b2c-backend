import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeaveModuleService } from './leave-module.service';

@Controller('leave')
export class LeaveModuleController {
  constructor(private readonly leaveModuleService: LeaveModuleService) {}

  @Get('types')
  getLeaveTypes() {
    return this.leaveModuleService.getLeaveTypes();
  }

  @Get('requests')
  getLeaveRequests() {
    return this.leaveModuleService.getLeaveRequests();
  }

  @Get()
  getLeave() {
    return this.leaveModuleService.getLeave();
  }

  @Get(':id')
  getLeaveById(@Param('id') id: string) {
    return this.leaveModuleService.getLeaveById(id);
  }

  @Post('requests')
  postLeaveRequests() {
    return this.leaveModuleService.postLeaveRequests();
  }

  @Put('requests/:id/status')
  putLeaveRequests(@Param('id') id: string, @Body() dto: any) {
    return this.leaveModuleService.putLeaveRequests(id, dto);
  }

  @Delete('requests/:id')
  deleteLeaveRequests(@Param('id') id: string) {
    return this.leaveModuleService.deleteLeaveRequests(id);
  }
}
