import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { FindLedgerDto } from './dto/find-ledger.dto';
import {
  LedgerEntry,
  LedgerEntryType,
  LedgerReferenceType,
} from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

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
    CREATE ENTRY
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
    REGISTER CREDIT
    =====================================
  */
  async registerCredit(
    accountId: string,
    amount: number,
    referenceType: LedgerReferenceType,
    referenceId: string,
    description?: string,
  ): Promise<LedgerEntry> {
    return this.createEntry({
      userId: '',
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
    REGISTER DEBIT
    =====================================
  */
  async registerDebit(
    useId: string,
    accountId: string,
    amount: number,
    referenceType: LedgerReferenceType,
    referenceId: string,
    description?: string,
  ): Promise<LedgerEntry> {
    return this.createEntry({
      // userId: useId,
      userId: '',
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
      where: {
        accountId,
      },
    });

    const credits = entries
      .filter((entry) => entry.type === LedgerEntryType.CREDIT)
      .reduce((acc, entry) => acc + Number(entry.amount), 0);

    const debits = entries
      .filter((entry) => entry.type === LedgerEntryType.DEBIT)
      .reduce((acc, entry) => acc + Number(entry.amount), 0);

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

    /*
    FILTER ACCOUNT
  */
    if (filters.accountId) {
      where.accountId = filters.accountId;
    }

    /*
    FILTER TYPE
  */
    if (filters.type) {
      where.type = filters.type;
    }

    /*
    FILTER DATE
  */
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};

      if (filters.startDate) {
        where.createdAt.gte = new Date(filters.startDate);
      }

      if (filters.endDate) {
        where.createdAt.lte = new Date(filters.endDate);
      }
    }

    /*
    TOTAL
  */
    const total = await this.prisma.ledgerEntry.count({
      where,
    });

    /*
    ENTRIES
  */
    const entries = await this.prisma.ledgerEntry.findMany({
      where,

      skip,

      take: limit,

      orderBy: {
        createdAt: 'desc',
      },
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
}
