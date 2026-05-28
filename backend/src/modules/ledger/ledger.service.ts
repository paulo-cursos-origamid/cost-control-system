import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { LedgerService } from '@/modules/ledger/ledger.service';

import { FindLedgerDto } from './dto/find-ledger.dto';
import {
  LedgerEntry,
  LedgerEntryType,
  LedgerReferenceType,
  // TransactionType,
} from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CreditCardInvoiceEngineService } from '../credit-card-invoices/services/credit-card-invoice-engine.service';

interface CreateEntryParams {
  userId: string;
  accountId: string;
  type: LedgerEntryType;
  referenceType: LedgerReferenceType;
  referenceId: string;
  amount: number;
  description?: string;
}

@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  /*
  =====================================
  CREATE SINGLE ENTRY (base)
  =====================================
  */
  async createEntry(data: CreateEntryParams): Promise<LedgerEntry> {
    return this.prisma.ledgerEntry.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        type: data.type,
        referenceType: data.referenceType,
        referenceId: data.referenceId,
        amount: data.amount,
        description: data.description,
      },
    });
  }

  /*
  =====================================
  DOUBLE ENTRY (CORE DO SISTEMA)
  =====================================
  */
  async createDoubleEntry(params: {
    userId: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    referenceType: LedgerReferenceType;
    referenceId: string;
    description?: string;
  }) {
    const {
      userId,
      fromAccountId,
      toAccountId,
      amount,
      referenceType,
      referenceId,
      description,
    } = params;

    return this.prisma.$transaction(async (tx) => {
      // DEBIT (saída)
      const debit = await tx.ledgerEntry.create({
        data: {
          userId,
          accountId: fromAccountId,
          type: LedgerEntryType.DEBIT,
          referenceType,
          referenceId,
          amount,
          description: description ?? 'Transfer out',
        },
      });

      // CREDIT (entrada)
      const credit = await tx.ledgerEntry.create({
        data: {
          userId,
          accountId: toAccountId,
          type: LedgerEntryType.CREDIT,
          referenceType,
          referenceId,
          amount,
          description: description ?? 'Transfer in',
        },
      });

      return { debit, credit };
    });
  }

  /*
  =====================================
  REGISTER CREDIT (receita)
  =====================================
  */
  async registerCredit(
    userId: string,
    accountId: string,
    amount: number,
    referenceType: LedgerReferenceType,
    referenceId: string,
    description?: string,
  ): Promise<LedgerEntry> {
    return this.createEntry({
      userId,
      accountId,
      amount,
      referenceType,
      referenceId,
      description,
      type: LedgerEntryType.CREDIT,
    });
  }

  /*
  =====================================
  REGISTER DEBIT (despesa)
  =====================================
  */
  async registerDebit(
    userId: string,
    accountId: string,
    amount: number,
    referenceType: LedgerReferenceType,
    referenceId: string,
    description?: string,
  ): Promise<LedgerEntry> {
    return this.createEntry({
      userId,
      accountId,
      amount,
      referenceType,
      referenceId,
      description,
      type: LedgerEntryType.DEBIT,
    });
  }

  /*
  =====================================
  CALCULATE BALANCE
  =====================================
  */
  async calculateBalance(accountId: string): Promise<number> {
    const entries = await this.prisma.ledgerEntry.findMany({
      where: { accountId },
    });

    const credits = entries
      .filter((e) => e.type === LedgerEntryType.CREDIT)
      .reduce((acc, e) => acc + Number(e.amount), 0);

    const debits = entries
      .filter((e) => e.type === LedgerEntryType.DEBIT)
      .reduce((acc, e) => acc + Number(e.amount), 0);

    return credits - debits;
  }

  /*
  =====================================
  FIND ALL
  =====================================
  */
  async findAll(userId: string, filters: FindLedgerDto) {
    const page = Number(filters.page ?? 1);
    const limit = Number(filters.limit ?? 10);
    const skip = (page - 1) * limit;

    const where: Prisma.LedgerEntryWhereInput = {
      userId,
    };

    if (filters.accountId) where.accountId = filters.accountId;
    if (filters.type) where.type = filters.type;

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
    }

    const total = await this.prisma.ledgerEntry.count({ where });

    const entries = await this.prisma.ledgerEntry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: entries,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /*
  =====================================
  GET ACCOUNT BALANCE (SOURCE OF TRUTH)
  =====================================
  */
  async getAccountBalance(accountId: string): Promise<number> {
    const entries = await this.prisma.ledgerEntry.findMany({
      where: { accountId },
      select: {
        amount: true,
        type: true,
      },
    });

    return entries.reduce((balance, entry) => {
      const amount = Number(entry.amount);

      if (entry.type === LedgerEntryType.CREDIT) {
        return balance + amount;
      }

      return balance - amount;
    }, 0);
  }
}
