import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, RecurrenceFrequency } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

@Injectable()
export class RecurringTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateRecurringTransactionDto) {
    return this.prisma.recurringTransaction.create({
      data: {
        title: dto.title,

        description: dto.description,

        amount: new Prisma.Decimal(dto.amount),

        type: dto.type,

        frequency: dto.frequency,

        startDate: new Date(dto.startDate),

        endDate: dto.endDate ? new Date(dto.endDate) : null,

        nextExecution: new Date(dto.nextExecution),

        active: dto.active ?? true,

        userId,

        accountId: dto.accountId,

        categoryId: dto.categoryId,
      },

      include: {
        account: true,
        category: true,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.recurringTransaction.findMany({
      where: {
        userId,
      },

      include: {
        account: true,
        category: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const recurringTransaction =
      await this.prisma.recurringTransaction.findFirst({
        where: {
          id,
          userId,
        },

        include: {
          account: true,
          category: true,
        },
      });

    if (!recurringTransaction) {
      throw new NotFoundException('Recurring transaction not found');
    }

    return recurringTransaction;
  }

  async update(id: string, userId: string, dto: UpdateRecurringTransactionDto) {
    await this.findOne(id, userId);

    return this.prisma.recurringTransaction.update({
      where: {
        id,
      },

      data: {
        title: dto.title,

        description: dto.description,

        amount:
          dto.amount !== undefined ? new Prisma.Decimal(dto.amount) : undefined,

        type: dto.type,

        frequency: dto.frequency,

        startDate: dto.startDate ? new Date(dto.startDate) : undefined,

        endDate: dto.endDate ? new Date(dto.endDate) : undefined,

        nextExecution: dto.nextExecution
          ? new Date(dto.nextExecution)
          : undefined,

        active: dto.active,
      },

      include: {
        account: true,
        category: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.recurringTransaction.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Recurring transaction deleted successfully',
    };
  }

  calculateNextExecution(currentDate: Date, frequency: RecurrenceFrequency) {
    const nextDate = new Date(currentDate);

    switch (frequency) {
      case RecurrenceFrequency.DAILY:
        nextDate.setDate(nextDate.getDate() + 1);
        break;

      case RecurrenceFrequency.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7);
        break;

      case RecurrenceFrequency.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;

      case RecurrenceFrequency.YEARLY:
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    return nextDate;
  }
}
