import { Controller, Get, Param, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  getRoutes() {
    return this.routesService.getRoutes();
  }

  @Get(':id')
  getRoutesById(@Param('id') id: string) {
    return this.routesService.getRoutesById(id);
  }

  @Get('team')
  getRoutesTeam() {
    return this.routesService.getRoutesTeam();
  }

  @Post()
  postRoutes() {
    return this.routesService.postRoutes();
  }

  @Post(':id')
  postRoutesById(@Param('id') id: string) {
    return this.routesService.postRoutesById(id);
  }
}
