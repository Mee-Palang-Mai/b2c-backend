import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeModuleService } from './overtime-module.service';

describe('OvertimeModuleService', () => {
  let service: OvertimeModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OvertimeModuleService],
    }).compile();

    service = module.get<OvertimeModuleService>(OvertimeModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
