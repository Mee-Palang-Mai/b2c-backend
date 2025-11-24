import { Controller, Get, Param, Post } from '@nestjs/common';
import { PayrollModuleService } from './payroll-module.service';

@Controller('payroll')
export class PayrollModuleController {
  constructor(private readonly payrollModuleService: PayrollModuleService) {}

  @Get('reports/export')
    getPayrollReport() {
      return this.payrollModuleService.getPayrollReport();
    }
  
  @Get('slips')
    getPayrollSlip() {
      return this.payrollModuleService.getPayrollSlip();
    }

  @Get('slips/:id/download')
    getPayrollSlipByID(@Param('id') id: string) {
      return this.payrollModuleService.getPayrollSlipByID(id);
    }
    
  @Post('run')
    postPayrollRequests() {
      return this.payrollModuleService.postPayrollRun();
    }
}
