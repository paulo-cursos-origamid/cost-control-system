import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    CREATE
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
      CREATE TRANSACTION
    */
    const transaction = await this.prisma.transaction.create({
      data: {
        title: dto.title,
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
    if (dto.type === TransactionType.INCOME) {
      await this.prisma.account.update({
        where: {
          id: dto.accountId,
        },

        data: {
          balance: {
            increment: dto.amount,
          },
        },
      });
    }

    if (dto.type === TransactionType.EXPENSE) {
      await this.prisma.account.update({
        where: {
          id: dto.accountId,
        },

        data: {
          balance: {
            decrement: dto.amount,
          },
        },
      });
    }

    return transaction;
  }

  /*
    FIND ALL
  */
  async findAll(userId: string, query: TransactionQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    return this.prisma.transaction.findMany({
      where: {
        userId,

        ...(query.type && {
          type: query.type,
        }),

        ...(query.accountId && {
          accountId: query.accountId,
        }),

        ...(query.categoryId && {
          categoryId: query.categoryId,
        }),

        ...(query.startDate &&
          query.endDate && {
            date: {
              gte: new Date(query.startDate),
              lte: new Date(query.endDate),
            },
          }),
      },

      include: {
        account: true,
        category: true,
      },

      orderBy: {
        date: 'desc',
      },

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  /*
    FIND ONE
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
    UPDATE
  */
  async update(id: string, userId: string, dto: UpdateTransactionDto) {
    const oldTransaction = await this.findOne(id, userId);

    /*
      ROLLBACK OLD BALANCE
    */
    if (oldTransaction.type === TransactionType.INCOME) {
      await this.prisma.account.update({
        where: {
          id: oldTransaction.accountId,
        },

        data: {
          balance: {
            decrement: oldTransaction.amount,
          },
        },
      });
    }

    if (oldTransaction.type === TransactionType.EXPENSE) {
      await this.prisma.account.update({
        where: {
          id: oldTransaction.accountId,
        },

        data: {
          balance: {
            increment: oldTransaction.amount,
          },
        },
      });
    }

    /*
      APPLY NEW BALANCE
    */
    const newType = dto.type ?? oldTransaction.type;

    const newAmount = dto.amount ?? oldTransaction.amount;

    const newAccountId = dto.accountId ?? oldTransaction.accountId;

    if (newType === TransactionType.INCOME) {
      await this.prisma.account.update({
        where: {
          id: newAccountId,
        },

        data: {
          balance: {
            increment: newAmount,
          },
        },
      });
    }

    if (newType === TransactionType.EXPENSE) {
      await this.prisma.account.update({
        where: {
          id: newAccountId,
        },

        data: {
          balance: {
            decrement: newAmount,
          },
        },
      });
    }

    /*
      UPDATE TRANSACTION
    */
    return this.prisma.transaction.update({
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
  }

  /*
    REMOVE
  */
  async remove(id: string, userId: string) {
    const transaction = await this.findOne(id, userId);

    /*
      ROLLBACK BALANCE
    */
    if (transaction.type === TransactionType.INCOME) {
      await this.prisma.account.update({
        where: {
          id: transaction.accountId,
        },

        data: {
          balance: {
            decrement: transaction.amount,
          },
        },
      });
    }

    if (transaction.type === TransactionType.EXPENSE) {
      await this.prisma.account.update({
        where: {
          id: transaction.accountId,
        },

        data: {
          balance: {
            increment: transaction.amount,
          },
        },
      });
    }

    await this.prisma.transaction.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Transaction deleted successfully',
    };
  }

  /*
    SUMMARY
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
