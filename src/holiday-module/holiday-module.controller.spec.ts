import { Test, TestingModule } from '@nestjs/testing';
import { HolidayModuleController } from './holiday-module.controller';
import { HolidayModuleService } from './holiday-module.service';

describe('HolidayModuleController', () => {
  let controller: HolidayModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayModuleController],
      providers: [HolidayModuleService],
    }).compile();

    controller = module.get<HolidayModuleController>(HolidayModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
