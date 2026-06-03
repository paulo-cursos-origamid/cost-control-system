import { Injectable, NotFoundException } from '@nestjs/common';

import { LedgerReferenceType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { AccountBalanceService } from '@/modules/ledger/services/account-balance.service';

import { FinancialReversalService } from '@/modules/financial-engine/services/financial-reversal.service';

@Injectable()
export class TransactionDeleteService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly reversalService: FinancialReversalService,

    private readonly balanceService: AccountBalanceService,
  ) {}

  /*
    =====================================
    DELETE TRANSACTION
    =====================================
  */
  async execute(id: string, userId: string) {
    /*
      FIND TRANSACTION
    */
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    /*
      VALIDATE
    */
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    /*
      TRANSACTION
    */
    return this.prisma.$transaction(async (tx) => {
      /*
          REVERSE FINANCIAL ENTRIES
        */
      await this.reversalService.reverse(LedgerReferenceType.TRANSACTION, id);

      /*
          DELETE TRANSACTION
        */
      await tx.transaction.delete({
        where: {
          id,
        },
      });

      /*
          RECALCULATE BALANCE
        */
      await this.balanceService.recalculate(transaction.accountId);

      return {
        message: 'Transaction deleted successfully',
      };
    });
  }
}
