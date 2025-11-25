import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseModuleService } from './expense-module.service';

@Controller('expenses')
export class ExpenseModuleController {
  constructor(private readonly expenseModuleService: ExpenseModuleService) {}

  @Get('requests')
  getExpenseRequests() {
    return this.expenseModuleService.getExpenseRequests();
  }

  @Get('requests/team')
  getExpenseRequestsTeam() {
    return this.expenseModuleService.getExpenseRequestsTeam();
  }

  // @Get()
  // getExpense() {
  //   return this.expenseModuleService.getExpense();
  // }

  // @Get(':id')
  // getExpenseById(@Param('id') id: string) {
  //   return this.expenseModuleService.getExpenseById(id);
  // }

  @Post('requests')
  postExpenseRequests() {
    return this.expenseModuleService.postExpenseRequests();
  }

  @Put('requests/:id/status')
  putExpenseRequests(@Param('id') id: string, @Body() dto: any) {
    return this.expenseModuleService.putExpenseRequests(id, dto);
  }
}
