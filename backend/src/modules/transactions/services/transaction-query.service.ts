import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { FindTransactionsDto } from '../dto/find-transactions.dto';

@Injectable()
export class TransactionQueryService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =====================================
    FIND ALL
    =====================================
  */
  async findAll(userId: string, filters: FindTransactionsDto) {
    const page = Number(filters.page ?? 1);

    const limit = Number(filters.limit ?? 10);

    const skip = (page - 1) * limit;

    const where: Prisma.TransactionWhereInput = {
      userId,
      deletedAt: null,
    };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.accountId) {
      where.accountId = filters.accountId;
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.search) {
      where.OR = [
        {
          title: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (filters.startDate || filters.endDate) {
      where.date = {};

      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }

      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate);
      }
    }

    if (filters.minAmount || filters.maxAmount) {
      where.amount = {};

      if (filters.minAmount) {
        where.amount.gte = Number(filters.minAmount);
      }

      if (filters.maxAmount) {
        where.amount.lte = Number(filters.maxAmount);
      }
    }

    const total = await this.prisma.transaction.count({
      where,
    });

    const data = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,

      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.order ?? 'desc',
      },

      include: {
        account: true,
        category: true,
      },
    });

    return {
      data,

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
    FIND ONE
    =====================================
  */
  async findOne(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },

      include: {
        account: true,
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  /*
    =====================================
    SUMMARY
    =====================================
  */
  async summary(userId: string) {
    const incomes = await this.prisma.transaction.aggregate({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.INCOME,
      },

      _sum: {
        amount: true,
      },
    });

    const expenses = await this.prisma.transaction.aggregate({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },
    });

    const income = incomes._sum.amount ?? 0;

    const expense = expenses._sum.amount ?? 0;

    return {
      income,
      expense,
      balance: income - expense,
    };
  }
}
