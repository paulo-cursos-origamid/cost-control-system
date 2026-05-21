import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [PrismaModule, LedgerModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
