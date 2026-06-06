import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { LedgerService } from './ledger.service';

@Injectable()
export class AccountBalanceService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly ledgerService: LedgerService,
  ) {}

  /*
    =====================================
    RECALCULATE ACCOUNT BALANCE
    =====================================
  */
  async recalculate(accountId: string): Promise<number> {
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

  /*
    =====================================
    REFRESH (LEGACY COMPATIBILITY)
    =====================================
  */
  async refresh(accountId: string): Promise<number> {
    return this.recalculate(accountId);
  }

  /*
    =====================================
    RECALCULATE MANY
    =====================================
  */
  async recalculateMany(accountIds: string[]): Promise<void> {
    const unique = [...new Set(accountIds)];

    await Promise.all(unique.map((accountId) => this.recalculate(accountId)));
  }
}
