import { Injectable } from '@nestjs/common';

import { LedgerReferenceType, TransactionType } from '@prisma/client';

import { LedgerService } from '@/modules/ledger/ledger.service';

@Injectable()
export class TransactionFactory {
  constructor(private readonly ledgerService: LedgerService) {}

  async income(params: {
    userId: string;
    accountId: string;
    amount: number;
    referenceId: string;
    description?: string | null;
  }) {
    await this.ledgerService.registerCredit(
      params.userId,
      params.accountId,
      params.amount,
      LedgerReferenceType.TRANSACTION,
      params.referenceId,
      params.description ?? undefined,
    );

    return this.ledgerService.calculateBalance(params.accountId);
  }

  async expense(params: {
    userId: string;
    accountId: string;
    amount: number;
    referenceId: string;
    description?: string | null;
  }) {
    await this.ledgerService.registerDebit(
      params.userId,
      params.accountId,
      params.amount,
      LedgerReferenceType.TRANSACTION,
      params.referenceId,
      params.description ?? undefined,
    );

    return this.ledgerService.calculateBalance(params.accountId);
  }

  // async transfer(params: {
  //   userId: string;
  //   fromAccountId: string;
  //   toAccountId: string;
  //   amount: number;
  //   referenceId: string;
  //   description?: string | null;
  // }) {
  //   await this.ledgerService.createDoubleEntry({
  //     userId: params.userId,
  //     fromAccountId: params.fromAccountId,
  //     toAccountId: params.toAccountId,
  //     amount: params.amount,
  //     referenceType: LedgerReferenceType.TRANSFER,
  //     referenceId: params.referenceId,
  //     description: params.description ?? undefined,
  //   });

  //   return {
  //     fromBalance: await this.ledgerService.calculateBalance(
  //       params.fromAccountId,
  //     ),

  //     toBalance: await this.ledgerService.calculateBalance(params.toAccountId),
  //   };
  // }

  async recalculateBalance(accountId: string) {
    return this.ledgerService.calculateBalance(accountId);
  }
  async reverse(referenceId: string) {
    return this.ledgerService.deleteEntriesByReference(
      LedgerReferenceType.TRANSACTION,
      referenceId,
    );
  }
  async replay(params: {
    userId: string;
    accountId: string;
    amount: number;
    type: TransactionType;
    referenceId: string;
    description?: string | null;
  }) {
    if (params.type === TransactionType.INCOME) {
      return this.income({
        userId: params.userId,
        accountId: params.accountId,
        amount: params.amount,
        referenceId: params.referenceId,
        description: params.description,
      });
    }

    return this.expense({
      userId: params.userId,
      accountId: params.accountId,
      amount: params.amount,
      referenceId: params.referenceId,
      description: params.description,
    });
  }
}
