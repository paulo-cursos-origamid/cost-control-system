import { LedgerTransactionBalanceService } from './services/ledger-transaction-balance.service';
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerService } from './services/ledger.service';
import { LedgerController } from './ledger.controller';

@Module({
  imports: [PrismaModule],

  providers: [LedgerService, LedgerTransactionBalanceService],

  exports: [LedgerService, LedgerTransactionBalanceService],

  controllers: [LedgerController],
})
export class LedgerModule {}
