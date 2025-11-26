import { Controller, Get, Param, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get('reports/export')
  getPayrollReport() {
    return this.payrollService.getPayrollReport();
  }

  @Get('slips')
  getPayrollSlip() {
    return this.payrollService.getPayrollSlip();
  }

  @Get('slips/:id/download')
  getPayrollSlipByID(@Param('id') id: string) {
    return this.payrollService.getPayrollSlipByID(id);
  }

  @Post('run')
  postPayrollRequests() {
    return this.payrollService.postPayrollRun();
  }
}
