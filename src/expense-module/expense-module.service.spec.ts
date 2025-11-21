import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseModuleService } from './expense-module.service';

describe('ExpenseModuleService', () => {
  let service: ExpenseModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseModuleService],
    }).compile();

    service = module.get<ExpenseModuleService>(ExpenseModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
