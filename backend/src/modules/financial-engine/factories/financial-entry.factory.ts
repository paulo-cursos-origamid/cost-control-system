import { Injectable } from '@nestjs/common';

import { LedgerReferenceType, LedgerEntryType } from '@prisma/client';

import { LedgerService } from '@/modules/ledger/services/ledger.service';

@Injectable()
export class FinancialEntryFactory {
  constructor(private readonly ledgerService: LedgerService) {}

  /*
    =====================================
    CREDIT
    =====================================
  */
  async credit(params: {
    userId: string;
    accountId: string;
    amount: number;
    referenceType: LedgerReferenceType;
    referenceId: string;
    description?: string | null;
  }) {
    await this.ledgerService.createEntry({
      userId: params.userId,
      accountId: params.accountId,
      type: LedgerEntryType.CREDIT,
      amount: params.amount,
      referenceType: params.referenceType,
      referenceId: params.referenceId,
      description: params.description ?? undefined,
    });

    return this.ledgerService.calculateBalance(params.accountId);
  }

  /*
    =====================================
    DEBIT
    =====================================
  */
  async debit(params: {
    userId: string;
    accountId: string;
    amount: number;
    referenceType: LedgerReferenceType;
    referenceId: string;
    description?: string | null;
  }) {
    await this.ledgerService.createEntry({
      userId: params.userId,
      accountId: params.accountId,
      type: LedgerEntryType.DEBIT,
      amount: params.amount,
      referenceType: params.referenceType,
      referenceId: params.referenceId,
      description: params.description ?? undefined,
    });

    return this.ledgerService.calculateBalance(params.accountId);
  }

  /*
    =====================================
    TRANSFER
    =====================================
  */
  async transfer(params: {
    userId: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    referenceId: string;
    description?: string | null;
  }) {
    /*
      FROM ACCOUNT
    */
    await this.debit({
      userId: params.userId,
      accountId: params.fromAccountId,
      amount: params.amount,
      referenceType: LedgerReferenceType.TRANSFER,
      referenceId: params.referenceId,
      description: params.description,
    });

    /*
      TO ACCOUNT
    */
    await this.credit({
      userId: params.userId,
      accountId: params.toAccountId,
      amount: params.amount,
      referenceType: LedgerReferenceType.TRANSFER,
      referenceId: params.referenceId,
      description: params.description,
    });

    return {
      fromBalance: await this.ledgerService.calculateBalance(
        params.fromAccountId,
      ),

      toBalance: await this.ledgerService.calculateBalance(params.toAccountId),
    };
  }

  /*
    =====================================
    REVERSE
    =====================================
  */
  async reverse(referenceType: LedgerReferenceType, referenceId: string) {
    return this.ledgerService.deleteEntriesByReference(
      referenceType,
      referenceId,
    );
  }
}
