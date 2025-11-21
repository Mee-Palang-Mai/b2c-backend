import { Test, TestingModule } from '@nestjs/testing';
import { PayrollModuleService } from './payroll-module.service';

describe('PayrollModuleService', () => {
  let service: PayrollModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollModuleService],
    }).compile();

    service = module.get<PayrollModuleService>(PayrollModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
