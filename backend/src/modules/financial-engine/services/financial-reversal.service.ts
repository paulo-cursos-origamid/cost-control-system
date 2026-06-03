import { Injectable } from '@nestjs/common';

import { LedgerEntryType, LedgerReferenceType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { LedgerService } from '@/modules/ledger/services/ledger.service';

@Injectable()
export class FinancialReversalService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly ledgerService: LedgerService,
  ) {}

  /*
    =====================================
    REVERSE ENTRIES
    =====================================
  */
  async reverse(referenceType: LedgerReferenceType, referenceId: string) {
    /*
      FIND ORIGINAL ENTRIES
    */
    const entries = await this.prisma.ledgerEntry.findMany({
      where: {
        referenceType,
        referenceId,
      },
    });

    /*
      CREATE REVERSAL ENTRIES
    */
    for (const entry of entries) {
      await this.ledgerService.replayEntry(
        entry.type === LedgerEntryType.CREDIT
          ? LedgerEntryType.DEBIT
          : LedgerEntryType.CREDIT,

        entry.userId,

        entry.accountId,

        Number(entry.amount),

        referenceType,

        referenceId,

        `[REVERSAL] ${entry.description ?? ''}`,
      );
    }

    return {
      reversed: entries.length,
    };
  }
}
