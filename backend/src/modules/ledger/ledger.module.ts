import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerService } from './services/ledger.service';
import { LedgerController } from './ledger.controller';
import { AccountBalanceService } from './services/account-balance.service';

@Module({
  imports: [PrismaModule],

  providers: [LedgerService, AccountBalanceService],

  exports: [LedgerService, AccountBalanceService],

  controllers: [LedgerController],
})
export class LedgerModule {}
