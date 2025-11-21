import { Module } from '@nestjs/common';
import { AttendanceModuleService } from './attendance-module.service';
import { AttendanceModuleController } from './attendance-module.controller';

@Module({
  controllers: [AttendanceModuleController],
  providers: [AttendanceModuleService],
})
export class AttendanceModuleModule {}
