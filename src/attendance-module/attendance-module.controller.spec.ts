import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceModuleController } from './attendance-module.controller';
import { AttendanceModuleService } from './attendance-module.service';

describe('AttendanceModuleController', () => {
  let controller: AttendanceModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceModuleController],
      providers: [AttendanceModuleService],
    }).compile();

    controller = module.get<AttendanceModuleController>(
      AttendanceModuleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
