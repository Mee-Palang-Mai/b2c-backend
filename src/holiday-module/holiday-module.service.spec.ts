import { Test, TestingModule } from '@nestjs/testing';
import { HolidayModuleService } from './holiday-module.service';

describe('HolidayModuleService', () => {
  let service: HolidayModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayModuleService],
    }).compile();

    service = module.get<HolidayModuleService>(HolidayModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
