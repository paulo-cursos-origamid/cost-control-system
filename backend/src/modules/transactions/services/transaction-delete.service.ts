import { Injectable, NotFoundException } from '@nestjs/common';

import { LedgerReferenceType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { TransactionFactory } from '../factories/transaction.factory';

@Injectable()
export class TransactionDeleteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: TransactionFactory,
  ) {}

  async execute(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.$transaction(async (tx) => {
      /*
        REMOVE LEDGER ENTRIES
      */
      await tx.ledgerEntry.deleteMany({
        where: {
          referenceType: LedgerReferenceType.TRANSACTION,

          referenceId: id,
        },
      });

      /*
        RECALCULATE BALANCE
      */
      const balance = await this.factory.recalculateBalance(
        transaction.accountId,
      );

      await tx.account.update({
        where: {
          id: transaction.accountId,
        },

        data: {
          balance,
        },
      });

      /*
        DELETE TRANSACTION
      */
      await tx.transaction.delete({
        where: { id },
      });

      return {
        message: 'Transaction deleted successfully',
      };
    });
  }
}
