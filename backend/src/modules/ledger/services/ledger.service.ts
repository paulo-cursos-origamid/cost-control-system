import { Injectable } from '@nestjs/common';

import {
  LedgerEntry,
  LedgerEntryType,
  LedgerReferenceType,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { FindLedgerDto } from '../dto/find-ledger.dto';

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
    REGISTER DEBIT
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
    REPLAY ENTRY
    =====================================
  */
  async replayEntry(
    type: LedgerEntryType,
    userId: string,
    accountId: string,
    amount: number,
    referenceType: LedgerReferenceType,
    referenceId: string,
    description?: string,
  ) {
    if (type === LedgerEntryType.CREDIT) {
      return this.registerCredit(
        userId,
        accountId,
        amount,
        referenceType,
        referenceId,
        description,
      );
    }

    return this.registerDebit(
      userId,
      accountId,
      amount,
      referenceType,
      referenceId,
      description,
    );
  }

  /*
    =====================================
    CALCULATE BALANCE
    =====================================
  */
  async calculateBalance(accountId: string): Promise<number> {
    const credits = await this.prisma.ledgerEntry.aggregate({
      where: {
        accountId,
        type: LedgerEntryType.CREDIT,
      },

      _sum: {
        amount: true,
      },
    });

    const debits = await this.prisma.ledgerEntry.aggregate({
      where: {
        accountId,
        type: LedgerEntryType.DEBIT,
      },

      _sum: {
        amount: true,
      },
    });

    return Number(credits._sum.amount ?? 0) - Number(debits._sum.amount ?? 0);
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

  /*
    =====================================
    DELETE ENTRIES BY REFERENCE
    =====================================
  */
  async deleteEntriesByReference(
    referenceType: LedgerReferenceType,
    referenceId: string,
  ) {
    return this.prisma.ledgerEntry.deleteMany({
      where: {
        referenceType,
        referenceId,
      },
    });
  }
}
