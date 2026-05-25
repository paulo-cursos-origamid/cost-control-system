import { Module } from '@nestjs/common';

import { CreditCardInvoicesController } from './credit-card-invoices.controller';

import { CreditCardInvoicesService } from './credit-card-invoices.service';
import { CreditCardInvoiceEngineService } from './services/credit-card-invoice-engine.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  controllers: [CreditCardInvoicesController],

  providers: [CreditCardInvoicesService, CreditCardInvoiceEngineService],
  exports: [
    CreditCardInvoiceEngineService, // 👈 OBRIGATÓRIO
  ],
  imports: [LedgerModule],
})
export class CreditCardInvoicesModule {}
