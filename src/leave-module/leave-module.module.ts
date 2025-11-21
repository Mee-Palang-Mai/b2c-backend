import { Module } from '@nestjs/common';
import { LeaveModuleService } from './leave-module.service';
import { LeaveModuleController } from './leave-module.controller';

@Module({
  controllers: [LeaveModuleController],
  providers: [LeaveModuleService],
})
export class LeaveModuleModule {}
