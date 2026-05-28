import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerService } from './ledger.service';

@Module({
  imports: [PrismaModule],
  providers: [LedgerService],
  exports: [LedgerService],
})
export class LedgerModule {}
