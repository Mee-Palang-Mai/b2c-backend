import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollModuleService {
  getPayrollSlip() {
    throw new Error('Method not implemented.');
  }
  getPayrollReport() {
    throw new Error('Method not implemented.');
  }
  getPayrollSlipByID(id: string) {
    throw new Error('Method not implemented.');
  }
  postPayrollRun() {
    throw new Error('Method not implemented.');
  }
}
