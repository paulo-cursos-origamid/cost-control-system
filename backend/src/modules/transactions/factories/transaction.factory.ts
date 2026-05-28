import { Injectable } from '@nestjs/common';

import { LedgerReferenceType } from '@prisma/client';

import { LedgerService } from '@/modules/ledger/ledger.service';

interface IncomePayload {
  userId: string;
  accountId: string;
  amount: number;
  referenceId: string;
  description?: string | null;
}

interface ExpensePayload {
  userId: string;
  accountId: string;
  amount: number;
  referenceId: string;
  description?: string | null;
}

interface TransferPayload {
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  referenceId: string;
  description?: string | null;
}

@Injectable()
export class TransactionFactory {
  constructor(private readonly ledgerService: LedgerService) {}

  income(payload: IncomePayload) {
    return this.ledgerService.registerCredit(
      payload.userId,
      payload.accountId,
      payload.amount,
      LedgerReferenceType.TRANSACTION,
      payload.referenceId,
      payload.description ?? undefined,
    );
  }

  expense(payload: ExpensePayload) {
    return this.ledgerService.registerDebit(
      payload.userId,
      payload.accountId,
      payload.amount,
      LedgerReferenceType.TRANSACTION,
      payload.referenceId,
      payload.description ?? undefined,
    );
  }

  transfer(payload: TransferPayload) {
    return this.ledgerService.createDoubleEntry({
      userId: payload.userId,
      fromAccountId: payload.fromAccountId,
      toAccountId: payload.toAccountId,
      amount: payload.amount,
      referenceType: LedgerReferenceType.TRANSFER,
      referenceId: payload.referenceId,
      description: payload.description ?? undefined,
    });
  }
}
