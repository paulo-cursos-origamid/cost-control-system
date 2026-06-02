import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

import { CreditCardInvoiceEngineService } from '@/modules/credit-card-invoices/services/credit-card-invoice-engine.service';
import { TransactionFactory } from '../factories/transaction.factory';
import { TransactionValidatorService } from './transaction-validator.service';
import { AccountBalanceService } from '@/modules/ledger/services/account-balance.service';

@Injectable()
export class TransactionProcessorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: TransactionFactory,

    private readonly invoiceEngine: CreditCardInvoiceEngineService,
    private readonly validator: TransactionValidatorService,
    private readonly balanceService: AccountBalanceService,
  ) {}

  async create(userId: string, dto: CreateTransactionDto) {
    await this.validator.validate(userId, dto);

    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          title: dto.title,
          description: dto.description,
          amount: dto.amount,
          type: dto.type,
          date: new Date(dto.date),

          userId,
          accountId: dto.accountId,
          categoryId: dto.categoryId,
          creditCardId: dto.creditCardId ?? null,
        },
      });

      /*
        CREDIT CARD
      */
      if (dto.creditCardId) {
        await this.invoiceEngine.attachTransactionToInvoice(tx, {
          userId,
          transactionId: transaction.id,
          creditCardId: dto.creditCardId,
          amount: dto.amount,
          date: new Date(dto.date),
        });
      }

      /*
        LEDGER
      */
      await this.factory.replay({
        userId,
        accountId: dto.accountId,
        amount: dto.amount,
        type: dto.type,
        referenceId: transaction.id,
        description: dto.description ?? undefined,
      });

      await this.balanceService.recalculate(dto.accountId);
      return transaction;
    });
  }
}
