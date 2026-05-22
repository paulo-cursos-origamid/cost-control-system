import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

@Injectable()
export class RecurringTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    CREATE
  */
  async create(
    userId: string,
    dto: CreateRecurringTransactionDto,
  ) {
    return this.prisma.recurringTransaction.create({
      data: {
        title: dto.title,
        description: dto.description,
        amount: dto.amount,

        type: dto.type,
        frequency: dto.frequency,

        startDate: new Date(dto.startDate),

        endDate: dto.endDate
          ? new Date(dto.endDate)
          : null,

        nextExecution: new Date(dto.nextExecution),

        active: dto.active ?? true,

        userId,

        accountId: dto.accountId,
        categoryId: dto.categoryId,
      },
    });
  }

  /*
    FIND ALL
  */
  async findAll(userId: string) {
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

  /*
    FIND ONE
  */
  async findOne(id: string, userId: string) {
    const recurring =
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

    if (!recurring) {
      throw new NotFoundException(
        'Recurring transaction not found',
      );
    }

    return recurring;
  }

  /*
    UPDATE
  */
  async update(
    id: string,
    userId: string,
    dto: UpdateRecurringTransactionDto,
  ) {
    await this.findOne(id, userId);

    return this.prisma.recurringTransaction.update({
      where: {
        id,
      },

      data: {
        ...dto,

        startDate: dto.startDate
          ? new Date(dto.startDate)
          : undefined,

        endDate: dto.endDate
          ? new Date(dto.endDate)
          : undefined,

        nextExecution: dto.nextExecution
          ? new Date(dto.nextExecution)
          : undefined,
      },
    });
  }

  /*
    DELETE
  */
  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.recurringTransaction.delete({
      where: {
        id,
      },
    });

    return {
      message:
        'Recurring transaction deleted successfully',
    };
  }
}