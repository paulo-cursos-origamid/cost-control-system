import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionFactory } from '../factories/transaction.factory';
import { LedgerTransactionBalanceService } from '@/modules/ledger/services/ledger-transaction-balance.service';

@Injectable()
export class TransactionUpdateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: TransactionFactory,
    private readonly balanceService: LedgerTransactionBalanceService,
  ) {}

  async execute(id: string, userId: string, dto: UpdateTransactionDto) {
    const oldTransaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!oldTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.$transaction(async (tx) => {
      /*
        REMOVE OLD LEDGER
      */
      await this.factory.reverse(id);

      /*
        UPDATE TRANSACTION
      */
      const updated = await tx.transaction.update({
        where: { id },

        data: {
          ...dto,

          date: dto.date ? new Date(dto.date) : undefined,
        },
      });

      /*
        REBUILD LEDGER
      */
      const type = dto.type ?? oldTransaction.type;

      const amount = dto.amount ?? oldTransaction.amount;

      const accountId = dto.accountId ?? oldTransaction.accountId;

      await this.factory.replay({
        userId,
        accountId,
        amount: Number(amount),
        type,
        referenceId: updated.id,
        description: updated.description,
      });
      await this.balanceService.refresh(accountId);
      return updated;
    });
  }
}
