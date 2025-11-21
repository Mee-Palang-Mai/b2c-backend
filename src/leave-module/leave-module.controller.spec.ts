import { Test, TestingModule } from '@nestjs/testing';
import { LeaveModuleController } from './leave-module.controller';
import { LeaveModuleService } from './leave-module.service';

describe('LeaveModuleController', () => {
  let controller: LeaveModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveModuleController],
      providers: [LeaveModuleService],
    }).compile();

    controller = module.get<LeaveModuleController>(LeaveModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
