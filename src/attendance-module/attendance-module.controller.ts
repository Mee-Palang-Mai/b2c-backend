import { Controller } from '@nestjs/common';
import { AttendanceModuleService } from './attendance-module.service';

@Controller('attendance-module')
export class AttendanceModuleController {
  constructor(
    private readonly attendanceModuleService: AttendanceModuleService,
  ) {}
}
