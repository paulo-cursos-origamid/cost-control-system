import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { LedgerModule } from '@/modules/ledger/ledger.module';

import { CreditCardInvoicesController } from './credit-card-invoices.controller';
import { CreditCardInvoicesService } from './credit-card-invoices.service';
import { CreditCardInvoiceEngineService } from './services/credit-card-invoice-engine.service';
import { TransactionsModule } from '@/modules/transactions/transactions.module';

@Module({
  imports: [PrismaModule, LedgerModule, forwardRef(() => TransactionsModule)],
  controllers: [CreditCardInvoicesController],
  providers: [CreditCardInvoicesService, CreditCardInvoiceEngineService],
  exports: [CreditCardInvoiceEngineService],
})
export class CreditCardInvoicesModule {}
