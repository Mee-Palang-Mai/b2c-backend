import { Test, TestingModule } from '@nestjs/testing';
import { IncentiveModuleController } from './incentive-module.controller';
import { IncentiveModuleService } from './incentive-module.service';

describe('IncentiveModuleController', () => {
  let controller: IncentiveModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncentiveModuleController],
      providers: [IncentiveModuleService],
    }).compile();

    controller = module.get<IncentiveModuleController>(
      IncentiveModuleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
