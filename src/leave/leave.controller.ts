import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveRequestDto, UpdateLeaveStatusDto } from './dto/dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

    @Get('types')
    getLeaveType() {
      return this.leaveService.getLeaveType();
    }

    @Get('requests')
    getLeaveRequest(@Req() req: any) {
      return this.leaveService.getLeaveRequest(req.user.empId);
    }

    @Get(':id')
    getLeaveById(@Param('id') id: string) {
      return this.leaveService.getLeaveById(id);
    }

    @Get('team-requests')
    getLeaveTeamRequest(@Req() req: any) {
      return this.leaveService.getLeaveTeamRequest(req.user.teamId);
    }

    @Post('requests')
    postLeaveRequest(@Body() dto: CreateLeaveRequestDto ) {
      return this.leaveService.postLeaveRequest(dto);
    }

    @Put('requests/:id/status')
    putLeaveRequestStatus(@Param('id') id: string,@Body() dto: UpdateLeaveStatusDto) {
      return this.leaveService.putLeaveRequestStatus(id,dto);
    }

    @Delete('requests/:id')
    deleteLeaveRequest(@Param('id') id: string) {
      return this.leaveService.deleteLeaveRequest(id);
    }
}
