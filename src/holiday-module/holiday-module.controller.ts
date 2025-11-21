import { Controller } from '@nestjs/common';
import { HolidayModuleService } from './holiday-module.service';

@Controller('holiday-module')
export class HolidayModuleController {
  constructor(private readonly holidayModuleService: HolidayModuleService) {}
}
