import { Controller, Get, Param, Put } from '@nestjs/common';
import { IncentiveService } from './incentive.service';

@Controller('incentives')
export class IncentiveController {
  constructor(
    private readonly incentiveService: IncentiveService,
  ) {}

  @Get('scores')
  getIncentives() {
    return this.incentiveService.getIncentives();
  }

  @Get('scores/team')
  getIncentivesTeam() {
    return this.incentiveService.getIncentivesTeam();
  }

  @Put('scores')
  putIncentives() {
    return this.incentiveService.putIncentives();
  }
}
