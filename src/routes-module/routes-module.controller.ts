import { Controller, Get, Param, Post } from '@nestjs/common';
import { RoutesModuleService } from './routes-module.service';

@Controller('routes')
export class RoutesModuleController {
  constructor(private readonly routesModuleService: RoutesModuleService) {}

@Get()
  getRoutes() {
    return this.routesModuleService.getRoutes();
}
  
@Get(':id')
  getRoutesById(@Param('id') id: string) {
    return this.routesModuleService.getRoutesById(id);
}

@Get('team')
  getRoutesTeam() {
    return this.routesModuleService.getRoutesTeam();
}

@Post()
  postRoutes() {
    return this.routesModuleService.postRoutes();
}

@Post(':id')
  postRoutesById(@Param('id') id: string) {
    return this.routesModuleService.postRoutesById(id);
}

}
