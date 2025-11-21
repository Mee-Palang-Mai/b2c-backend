import { Controller } from '@nestjs/common';
import { ExpenseModuleService } from './expense-module.service';

@Controller('expense-module')
export class ExpenseModuleController {
  constructor(private readonly expenseModuleService: ExpenseModuleService) {}
}
