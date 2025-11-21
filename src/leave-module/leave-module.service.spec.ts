import { Test, TestingModule } from '@nestjs/testing';
import { LeaveModuleService } from './leave-module.service';

describe('LeaveModuleService', () => {
  let service: LeaveModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveModuleService],
    }).compile();

    service = module.get<LeaveModuleService>(LeaveModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
