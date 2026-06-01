import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { LedgerService } from './ledger.service';

@Injectable()
export class LedgerTransactionBalanceService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly ledgerService: LedgerService,
  ) {}

  /*
    =====================================
    REFRESH ACCOUNT BALANCE
    =====================================
  */
  async refresh(accountId: string): Promise<number> {
    const balance = await this.ledgerService.calculateBalance(accountId);

    await this.prisma.account.update({
      where: {
        id: accountId,
      },

      data: {
        balance,
      },
    });

    return balance;
  }
}
