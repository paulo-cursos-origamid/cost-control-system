import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerModule } from '../ledger/ledger.module';

import { RecurringTransactionsModule } from '../recurring-transactions/recurring-transactions.module';

import { TransactionsModule } from '../transactions/transactions.module';

import { RecurringTransactionsProcessor } from './processors/recurring-transactions.processor';

@Module({
  imports: [
    PrismaModule,

    TransactionsModule,

    LedgerModule,

    RecurringTransactionsModule,
  ],

  providers: [RecurringTransactionsProcessor],
})
export class FinancialSchedulerModule {}
