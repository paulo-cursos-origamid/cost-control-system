import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

import { RecurringTransactionsProcessor } from './processors/recurring-transactions.processor';

@ApiTags('Financial Scheduler')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('financial-scheduler')
export class FinancialSchedulerController {
  constructor(
    private readonly recurringProcessor: RecurringTransactionsProcessor,
  ) {}

  /*
    HEALTH CHECK
  */
  @Get('health')
  health() {
    return {
      success: true,
      message: 'Financial Scheduler running',
      timestamp: new Date(),
    };
  }

  /*
    MANUAL EXECUTION
  */
  @Post('run-recurring')
  handleRecurringTransactions() {
    this.recurringProcessor.handleRecurringTransactions();

    return {
      success: true,
      message: 'Recurring transactions processor executed',
    };
  }
}
