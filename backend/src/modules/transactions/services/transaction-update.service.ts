import { Injectable, NotFoundException } from '@nestjs/common';

import { LedgerReferenceType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { UpdateTransactionDto } from '../dto/update-transaction.dto';

import { TransactionFactory } from '../factories/transaction.factory';

import { AccountBalanceService } from '@/modules/ledger/services/account-balance.service';

import { FinancialReversalService } from '@/modules/financial-engine/services/financial-reversal.service';

@Injectable()
export class TransactionUpdateService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly factory: TransactionFactory,

    private readonly reversalService: FinancialReversalService,

    private readonly balanceService: AccountBalanceService,
  ) {}

  /*
    =====================================
    UPDATE TRANSACTION
    =====================================
  */
  async execute(id: string, userId: string, dto: UpdateTransactionDto) {
    /*
      FIND TRANSACTION
    */
    const oldTransaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    /*
      VALIDATE
    */
    if (!oldTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    /*
      TRANSACTION
    */
    return this.prisma.$transaction(async (tx) => {
      /*
          REMOVE OLD FINANCIAL ENTRIES
        */
      await this.reversalService.reverse(LedgerReferenceType.TRANSACTION, id);

      /*
          UPDATE TRANSACTION
        */
      const updated = await tx.transaction.update({
        where: {
          id,
        },

        data: {
          ...dto,

          date: dto.date ? new Date(dto.date) : undefined,
        },
      });

      /*
          RESOLVE VALUES
        */
      const type = dto.type ?? oldTransaction.type;

      const amount = dto.amount ?? oldTransaction.amount;

      const accountId = dto.accountId ?? oldTransaction.accountId;

      /*
          REBUILD FINANCIAL ENTRIES
        */
      await this.factory.replay({
        userId,

        accountId,

        amount: Number(amount),

        type,

        referenceId: updated.id,

        description: updated.description,
      });

      /*
          RECALCULATE BALANCE
        */
      await this.balanceService.recalculate(accountId);

      return updated;
    });
  }
}
