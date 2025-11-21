import { Test, TestingModule } from '@nestjs/testing';
import { IncentiveModuleService } from './incentive-module.service';

describe('IncentiveModuleService', () => {
  let service: IncentiveModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncentiveModuleService],
    }).compile();

    service = module.get<IncentiveModuleService>(IncentiveModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
