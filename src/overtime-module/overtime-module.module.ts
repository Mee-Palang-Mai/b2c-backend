import { Module } from '@nestjs/common';
import { OvertimeModuleService } from './overtime-module.service';
import { OvertimeModuleController } from './overtime-module.controller';

@Module({
  controllers: [OvertimeModuleController],
  providers: [OvertimeModuleService],
})
export class OvertimeModuleModule {}
