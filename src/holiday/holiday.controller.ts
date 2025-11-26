import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HolidayService } from './holiday.service';

@Controller('holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  getHolidaysTypes() {
    return this.holidayService.getHolidays();
  }

  @Post()
  postHolidaysRequests() {
    return this.holidayService.postHolidays();
  }

  @Put(':id')
  putHolidaysRequests(@Param('id') id: string) {
    return this.holidayService.putHolidays(id);
  }

  @Delete(':id')
  deleteHolidaysRequests(@Param('id') id: string) {
    return this.holidayService.deleteHolidays(id);
  }
}
