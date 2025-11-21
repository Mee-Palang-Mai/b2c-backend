import { Module } from '@nestjs/common';
import { PayrollModuleService } from './payroll-module.service';
import { PayrollModuleController } from './payroll-module.controller';

@Module({
  controllers: [PayrollModuleController],
  providers: [PayrollModuleService],
})
export class PayrollModuleModule {}
