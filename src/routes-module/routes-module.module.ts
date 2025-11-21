import { Module } from '@nestjs/common';
import { RoutesModuleService } from './routes-module.service';
import { RoutesModuleController } from './routes-module.controller';

@Module({
  controllers: [RoutesModuleController],
  providers: [RoutesModuleService],
})
export class RoutesModuleModule {}
