import { Test, TestingModule } from '@nestjs/testing';
import { RoutesModuleService } from './routes-module.service';

describe('RoutesModuleService', () => {
  let service: RoutesModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutesModuleService],
    }).compile();

    service = module.get<RoutesModuleService>(RoutesModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
