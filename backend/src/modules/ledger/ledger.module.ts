import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';

@Module({
  imports: [PrismaModule],

  providers: [LedgerService],

  exports: [LedgerService],
  controllers: [LedgerController],
})
export class LedgerModule {}
