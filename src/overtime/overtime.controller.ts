import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { CreateOvertimeRequestDto, GetOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto/dto';

@Controller('overtime')
// @UseGuards(JwtAuthGuard)
export class OvertimeController {
  constructor(private readonly overtimeService: OvertimeService) {}

  // 1) ยื่นคำขอ OT
  @Post('requests')
  createOvertimeRequest(
    @Body() dto: CreateOvertimeRequestDto,
  ) {
    return this.overtimeService.createOvertimeRequest(dto);
  }

  // 2) ประวัติ OT ของตัวเอง
  @Get('requests')
  getrequestOvertime(@Body() dto: GetOvertimeRequestDto) {
    return this.overtimeService.getrequestOvertime(dto);
  }

  // 3) ดู OT รายการเดียว
  @Get('requests/:id')
  getOvertimeById(@Param('id') id: number) {
    return this.overtimeService.getOvertimeById(id);
  }

  // 4) หัวหน้าดู OT ของทีมตัวเอง
  @Get('team-requests')
  getTeamRequests(@Req() req: any) {
    return this.overtimeService.getTeamRequests(req.user.teamId);
  }

  // 5) อนุมัติ / ปฏิเสธ OT
  @Put('requests/:id/status')
  updateOvertimeStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOvertimeStatusDto,
  ) {
    return this.overtimeService.updateOvertimeStatus(id, dto);
  }
}
