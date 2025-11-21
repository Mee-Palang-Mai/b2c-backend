import { Test, TestingModule } from '@nestjs/testing';
import { PayrollModuleController } from './payroll-module.controller';
import { PayrollModuleService } from './payroll-module.service';

describe('PayrollModuleController', () => {
  let controller: PayrollModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollModuleController],
      providers: [PayrollModuleService],
    }).compile();

    controller = module.get<PayrollModuleController>(PayrollModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
