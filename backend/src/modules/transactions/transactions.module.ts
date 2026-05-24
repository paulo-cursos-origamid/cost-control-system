import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { LedgerModule } from '../ledger/ledger.module';
import { CreditCardInvoicesModule } from '../credit-card-invoices/credit-card-invoices.module';

@Module({
  imports: [LedgerModule, CreditCardInvoicesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
