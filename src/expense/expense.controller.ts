import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('requests')
  getExpenseRequests() {
    return this.expenseService.getExpenseRequests();
  }

  @Get('requests/team')
  getExpenseRequestsTeam() {
    return this.expenseService.getExpenseRequestsTeam();
  }

  // @Get()
  // getExpense() {
  //   return this.expenseService.getExpense();
  // }

  // @Get(':id')
  // getExpenseById(@Param('id') id: string) {
  //   return this.expenseService.getExpenseById(id);
  // }

  @Post('requests')
  postExpenseRequests() {
    return this.expenseService.postExpenseRequests();
  }

  @Put('requests/:id/status')
  putExpenseRequests(@Param('id') id: string, @Body() dto: any) {
    return this.expenseService.putExpenseRequests(id, dto);
  }
}
