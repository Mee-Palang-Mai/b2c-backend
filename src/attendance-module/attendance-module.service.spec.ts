import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceModuleService } from './attendance-module.service';

describe('AttendanceModuleService', () => {
  let service: AttendanceModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceModuleService],
    }).compile();

    service = module.get<AttendanceModuleService>(AttendanceModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
