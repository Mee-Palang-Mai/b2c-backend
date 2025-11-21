import { Controller } from '@nestjs/common';
import { LeaveModuleService } from './leave-module.service';

@Controller('leave-module')
export class LeaveModuleController {
  constructor(private readonly leaveModuleService: LeaveModuleService) {}
}
