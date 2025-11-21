import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeModuleController } from './overtime-module.controller';
import { OvertimeModuleService } from './overtime-module.service';

describe('OvertimeModuleController', () => {
  let controller: OvertimeModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OvertimeModuleController],
      providers: [OvertimeModuleService],
    }).compile();

    controller = module.get<OvertimeModuleController>(OvertimeModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
