import { Controller, Get, Param, Put } from '@nestjs/common';
import { IncentiveModuleService } from './incentive-module.service';

@Controller('incentives')
export class IncentiveModuleController {
  constructor(
    private readonly incentiveModuleService: IncentiveModuleService,
  ) {}

  @Get('scores')
  getIncentives() {
    return this.incentiveModuleService.getIncentives();
  }

  @Get('scores/team')
  getIncentivesTeam() {
    return this.incentiveModuleService.getIncentivesTeam();
  }

  @Put('scores')
  putIncentives() {
    return this.incentiveModuleService.putIncentives();
  }
}
