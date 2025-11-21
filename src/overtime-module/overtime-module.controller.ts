import { Controller } from '@nestjs/common';
import { OvertimeModuleService } from './overtime-module.service';

@Controller('overtime-module')
export class OvertimeModuleController {
  constructor(private readonly overtimeModuleService: OvertimeModuleService) {}
}
