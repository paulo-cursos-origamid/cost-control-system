import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerModule } from '@/modules/ledger/ledger.module';

import { FinancialEntryFactory } from './factories/financial-entry.factory';

import { FinancialBalanceService } from './services/financial-balance.service';
import { FinancialReversalService } from './services/financial-reversal.service';
import { FinancialTransferService } from './services/financial-transfer.service';

@Module({
  imports: [PrismaModule, LedgerModule],

  providers: [
    FinancialEntryFactory,

    FinancialBalanceService,
    FinancialReversalService,
    FinancialTransferService,
  ],

  exports: [
    FinancialEntryFactory,

    FinancialBalanceService,
    FinancialReversalService,
    FinancialTransferService,
  ],
})
export class FinancialEngineModule {}
