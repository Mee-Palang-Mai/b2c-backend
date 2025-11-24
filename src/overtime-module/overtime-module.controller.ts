import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OvertimeModuleService } from './overtime-module.service';
import { CreateOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';

@Controller('overtime')
export class OvertimeModuleController {
  constructor(private readonly overtimeModuleService: OvertimeModuleService) {}

  // 1) ยื่นคำขอ OT
  @Post('requests')
  createOvertimeRequest(@Body() dto: CreateOvertimeRequestDto) {
    return this.overtimeModuleService.createOvertimeRequest(dto);
  }

  // 2) ประวัติ OT ของตัวเอง
  @Get('requests')
  getrequestOvertime() {
    return this.overtimeModuleService.getrequestOvertime();
  }

  // 3) ดู OT รายการเดียว
  @Get('requests/:id')
  getOvertimeById(@Param('id') id: string) {
    return this.overtimeModuleService.getOvertimeById(id);
  }

  // 4) หัวหน้าดู OT ของทีมตัวเอง
  @Get('team-requests')
  getTeamRequests() {
    return this.overtimeModuleService.getTeamRequests();
  }

  // 5) อนุมัติ / ปฏิเสธ OT
  @Put('requests/:id/status')
  updateOvertimeStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOvertimeStatusDto,
  ) {
    return this.overtimeModuleService.updateOvertimeStatus(id, dto);
  }
  
}
