import { Injectable } from '@nestjs/common';

import { LedgerReferenceType, LedgerEntryType } from '@prisma/client';

import { LedgerService } from '@/modules/ledger/services/ledger.service';

@Injectable()
export class FinancialTransferService {
  constructor(private readonly ledgerService: LedgerService) {}

  /*
    =====================================
    CREATE TRANSFER ENTRIES
    =====================================
  */
  async transfer(params: {
    userId: string;

    fromAccountId: string;
    toAccountId: string;

    amount: number;

    referenceId: string;

    description?: string;
  }) {
    /*
      DEBIT ORIGIN
    */
    await this.ledgerService.replayEntry(
      LedgerEntryType.DEBIT,

      params.userId,

      params.fromAccountId,

      params.amount,

      LedgerReferenceType.TRANSFER,

      params.referenceId,

      params.description,
    );

    /*
      CREDIT DESTINATION
    */
    await this.ledgerService.replayEntry(
      LedgerEntryType.CREDIT,

      params.userId,

      params.toAccountId,

      params.amount,

      LedgerReferenceType.TRANSFER,

      params.referenceId,

      params.description,
    );
  }
}
