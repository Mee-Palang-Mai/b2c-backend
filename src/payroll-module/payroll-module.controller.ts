import { Controller } from '@nestjs/common';
import { PayrollModuleService } from './payroll-module.service';

@Controller('payroll-module')
export class PayrollModuleController {
  constructor(private readonly payrollModuleService: PayrollModuleService) {}
}
