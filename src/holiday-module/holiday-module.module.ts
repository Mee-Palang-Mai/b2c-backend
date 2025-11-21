import { Module } from '@nestjs/common';
import { HolidayModuleService } from './holiday-module.service';
import { HolidayModuleController } from './holiday-module.controller';

@Module({
  controllers: [HolidayModuleController],
  providers: [HolidayModuleService],
})
export class HolidayModuleModule {}
