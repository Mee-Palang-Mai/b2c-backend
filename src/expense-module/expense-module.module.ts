import { Module } from '@nestjs/common';
import { ExpenseModuleService } from './expense-module.service';
import { ExpenseModuleController } from './expense-module.controller';

@Module({
  controllers: [ExpenseModuleController],
  providers: [ExpenseModuleService],
})
export class ExpenseModuleModule {}
