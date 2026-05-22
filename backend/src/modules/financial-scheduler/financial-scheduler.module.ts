import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { RecurringTransactionsModule } from '../recurring-transactions/recurring-transactions.module';
import { FinancialSchedulerService } from './financial-scheduler.service';
import { RecurringTransactionsProcessor } from './processors/recurring-transactions.processor';
import { FinancialSchedulerController } from './financial-scheduler.controller';

@Module({
  imports: [PrismaModule, TransactionsModule, RecurringTransactionsModule],

  controllers: [FinancialSchedulerController],

  providers: [FinancialSchedulerService, RecurringTransactionsProcessor],
})
export class FinancialSchedulerModule {}
