import { Controller } from '@nestjs/common';
import { IncentiveModuleService } from './incentive-module.service';

@Controller('incentive-module')
export class IncentiveModuleController {
  constructor(private readonly incentiveModuleService: IncentiveModuleService) {}
}
