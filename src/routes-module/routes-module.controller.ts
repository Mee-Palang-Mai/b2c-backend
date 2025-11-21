import { Controller } from '@nestjs/common';
import { RoutesModuleService } from './routes-module.service';

@Controller('routes-module')
export class RoutesModuleController {
  constructor(private readonly routesModuleService: RoutesModuleService) {}
}
