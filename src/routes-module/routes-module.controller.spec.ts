import { Test, TestingModule } from '@nestjs/testing';
import { RoutesModuleController } from './routes-module.controller';
import { RoutesModuleService } from './routes-module.service';

describe('RoutesModuleController', () => {
  let controller: RoutesModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesModuleController],
      providers: [RoutesModuleService],
    }).compile();

    controller = module.get<RoutesModuleController>(RoutesModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
