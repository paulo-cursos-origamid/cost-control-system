import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

import { CreditCardInvoiceEngineService } from '@/modules/credit-card-invoices/services/credit-card-invoice-engine.service';
import { TransactionFactory } from '../factories/transaction.factory';

@Injectable()
export class TransactionProcessorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: TransactionFactory,

    private readonly invoiceEngine: CreditCardInvoiceEngineService,
  ) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const account = await this.prisma.account.findFirst({
      where: { id: dto.accountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
        OR: [{ userId }, { isDefault: true }],
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.type !== dto.type) {
      throw new BadRequestException('Transaction type differs from category');
    }

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
      if (dto.type === TransactionType.INCOME) {
        await this.factory.income({
          userId,
          accountId: dto.accountId,
          amount: dto.amount,
          referenceId: transaction.id,
          description: dto.description ?? undefined,
        });
      } else {
        await this.factory.expense({
          userId,
          accountId: dto.accountId,
          amount: dto.amount,
          referenceId: transaction.id,
          description: dto.description ?? undefined,
        });
      }
      return transaction;
    });
  }
}
