import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =====================================
    CREATE
    =====================================
  */
  async create(userId: string, dto: CreateTransactionDto) {
    /*
      VALIDATE ACCOUNT
    */
    const account = await this.prisma.account.findFirst({
      where: {
        id: dto.accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    /*
      VALIDATE CATEGORY
    */
    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,

        OR: [
          {
            userId,
          },

          {
            isDefault: true,
          },
        ],
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    /*
      VALIDATE CATEGORY TYPE
    */
    if (category.type !== dto.type) {
      throw new BadRequestException(
        'Transaction type differs from category type',
      );
    }

    /*
      DATABASE TRANSACTION
    */
    return this.prisma.$transaction(async (tx) => {
      /*
        CREATE TRANSACTION
      */
      const transaction = await tx.transaction.create({
        data: {
          title: dto.title,
          description: dto.description,
          amount: dto.amount,
          type: dto.type,
          date: new Date(dto.date),

          userId,

          accountId: dto.accountId,

          categoryId: dto.categoryId,
        },

        include: {
          account: true,
          category: true,
        },
      });

      /*
        UPDATE ACCOUNT BALANCE
      */
      const balanceChange =
        dto.type === TransactionType.INCOME ? dto.amount : -dto.amount;

      await tx.account.update({
        where: {
          id: dto.accountId,
        },

        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });

      return transaction;
    });
  }

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
    };

    /*
      FILTER TYPE
    */
    if (filters.type) {
      where.type = filters.type;
    }

    /*
      FILTER ACCOUNT
    */
    if (filters.accountId) {
      where.accountId = filters.accountId;
    }

    /*
      FILTER CATEGORY
    */
    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    /*
      FILTER DATE
    */
    if (filters.startDate || filters.endDate) {
      where.date = {};

      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }

      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate);
      }
    }

    /*
      QUERY
    */
    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,

        include: {
          account: true,
          category: true,
        },

        orderBy: {
          date: 'desc',
        },

        skip,

        take: limit,
      }),

      this.prisma.transaction.count({
        where,
      }),
    ]);

    return {
      data: transactions,

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
    UPDATE
    =====================================
  */
  async update(id: string, userId: string, dto: UpdateTransactionDto) {
    const oldTransaction = await this.findOne(id, userId);

    /*
      VALIDATE NEW ACCOUNT
    */
    if (dto.accountId) {
      const account = await this.prisma.account.findFirst({
        where: {
          id: dto.accountId,
          userId,
        },
      });

      if (!account) {
        throw new NotFoundException('Account not found');
      }
    }

    /*
      VALIDATE NEW CATEGORY
    */
    if (dto.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: {
          id: dto.categoryId,

          OR: [
            {
              userId,
            },

            {
              isDefault: true,
            },
          ],
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const transactionType = dto.type ?? oldTransaction.type;

      if (category.type !== transactionType) {
        throw new BadRequestException(
          'Transaction type differs from category type',
        );
      }
    }

    return this.prisma.$transaction(async (tx) => {
      /*
        REMOVE OLD BALANCE IMPACT
      */
      const reverseOldImpact =
        oldTransaction.type === TransactionType.INCOME
          ? -oldTransaction.amount
          : oldTransaction.amount;

      await tx.account.update({
        where: {
          id: oldTransaction.accountId,
        },

        data: {
          balance: {
            increment: reverseOldImpact,
          },
        },
      });

      /*
        NEW VALUES
      */
      const newType = dto.type ?? oldTransaction.type;

      const newAmount = dto.amount ?? oldTransaction.amount;

      const newAccountId = dto.accountId ?? oldTransaction.accountId;

      /*
        APPLY NEW BALANCE IMPACT
      */
      const newImpact =
        newType === TransactionType.INCOME ? newAmount : -newAmount;

      await tx.account.update({
        where: {
          id: newAccountId,
        },

        data: {
          balance: {
            increment: newImpact,
          },
        },
      });

      /*
        UPDATE TRANSACTION
      */
      return tx.transaction.update({
        where: {
          id,
        },

        data: {
          ...dto,

          date: dto.date ? new Date(dto.date) : undefined,
        },

        include: {
          account: true,
          category: true,
        },
      });
    });
  }

  /*
    =====================================
    REMOVE
    =====================================
  */
  async remove(id: string, userId: string) {
    const transaction = await this.findOne(id, userId);

    return this.prisma.$transaction(async (tx) => {
      /*
        ROLLBACK ACCOUNT BALANCE
      */
      const reverseImpact =
        transaction.type === TransactionType.INCOME
          ? -transaction.amount
          : transaction.amount;

      await tx.account.update({
        where: {
          id: transaction.accountId,
        },

        data: {
          balance: {
            increment: reverseImpact,
          },
        },
      });

      /*
        DELETE TRANSACTION
      */
      await tx.transaction.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Transaction deleted successfully',
      };
    });
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
        type: TransactionType.INCOME,
      },

      _sum: {
        amount: true,
      },
    });

    const expenses = await this.prisma.transaction.aggregate({
      where: {
        userId,
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
