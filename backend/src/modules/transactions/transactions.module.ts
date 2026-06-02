import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { LedgerModule } from '../ledger/ledger.module';
import { CreditCardInvoicesModule } from '../credit-card-invoices/credit-card-invoices.module';
import { TransactionProcessorService } from './services/transaction-processor.service';
import { TransactionFactory } from './factories/transaction.factory';
import { TransactionUpdateService } from './services/transaction-update.service';
import { TransactionValidatorService } from './services/transaction-validator.service';
import { TransactionQueryService } from './services/transaction-query.service';
import { TransactionRestoreService } from './services/transaction-restore.service';

@Module({
  imports: [LedgerModule, CreditCardInvoicesModule, TransactionFactory],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionProcessorService,
    TransactionUpdateService,
    TransactionValidatorService,
    TransactionQueryService,
    TransactionRestoreService,
    TransactionFactory,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
