import { Module } from '@nestjs/common';
import { IncentiveModuleService } from './incentive-module.service';
import { IncentiveModuleController } from './incentive-module.controller';

@Module({
  controllers: [IncentiveModuleController],
  providers: [IncentiveModuleService],
})
export class IncentiveModuleModule {}
