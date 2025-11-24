import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HolidayModuleService } from './holiday-module.service';

@Controller('holidays')
export class HolidayModuleController {
  constructor(private readonly holidayModuleService: HolidayModuleService) {}

    @Get()
    getHolidaysTypes(){
      return this.holidayModuleService.getHolidays();
    }
  
    @Post()
    postHolidaysRequests() {
      return this.holidayModuleService.postHolidays();
    }
  
    @Put(':id')
    putHolidaysRequests(@Param('id') id: string) {
      return this.holidayModuleService.putHolidays(id);
    }
  
    @Delete(':id')
    deleteHolidaysRequests(@Param('id') id: string) {
      return this.holidayModuleService.deleteHolidays(id);
    }
}
