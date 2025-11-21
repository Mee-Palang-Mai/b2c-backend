import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseModuleController } from './expense-module.controller';
import { ExpenseModuleService } from './expense-module.service';

describe('ExpenseModuleController', () => {
  let controller: ExpenseModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseModuleController],
      providers: [ExpenseModuleService],
    }).compile();

    controller = module.get<ExpenseModuleController>(ExpenseModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
