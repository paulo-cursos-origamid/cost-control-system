import { PrismaModule } from '@/database/prisma.module';
import { Module, forwardRef } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { LedgerModule } from '../ledger/ledger.module';
import { CreditCardInvoicesModule } from '@/modules/credit-card-invoices/credit-card-invoices.module';
import { TransactionFactory } from './factories/transaction.factory';

@Module({
  imports: [
    PrismaModule,
    LedgerModule,
    forwardRef(() => CreditCardInvoicesModule),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionFactory],
  exports: [TransactionsService],
})
export class TransactionsModule {}
