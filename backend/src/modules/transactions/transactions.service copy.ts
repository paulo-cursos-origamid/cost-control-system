import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LedgerReferenceType, Prisma, TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { LedgerService } from '@/modules/ledger/ledger.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

import { CreditCardInvoiceEngineService } from '../credit-card-invoices/services/credit-card-invoice-engine.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ledgerService: LedgerService,
    private readonly invoiceEngine: CreditCardInvoiceEngineService,
  ) {}

  /*
    =====================================
    CREATE
    =====================================
  */
  async create(userId: string, dto: CreateTransactionDto) {
    const account = await this.prisma.account.findFirst({
      where: { id: dto.accountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
        OR: [{ userId }, { isDefault: true }],
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.type !== dto.type) {
      throw new BadRequestException('Transaction type differs from category');
    }

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
          creditCardId: dto.creditCardId ?? null,
        },
      });

      /*
        CREDIT CARD FLOW
      */
      if (dto.creditCardId) {
        await this.invoiceEngine.attachTransactionToInvoice(tx, {
          userId,
          transactionId: transaction.id,
          creditCardId: dto.creditCardId,
          amount: dto.amount,
          date: new Date(dto.date),
        });
      }

      /*
        LEDGER ENTRY
      */
      if (dto.type === TransactionType.INCOME) {
        await this.ledgerService.registerCredit(
          userId,
          dto.accountId,
          dto.amount,
          LedgerReferenceType.TRANSACTION,
          transaction.id,
          dto.description,
        );
      } else {
        await this.ledgerService.registerDebit(
          userId,
          dto.accountId,
          dto.amount,
          LedgerReferenceType.TRANSACTION,
          transaction.id,
          dto.description,
        );
      }

      /*
        UPDATE ACCOUNT BALANCE
      */
      const balance = await this.ledgerService.calculateBalance(dto.accountId);

      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance },
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
      deletedAt: null,
    };

    if (filters.type) where.type = filters.type;
    if (filters.accountId) where.accountId = filters.accountId;
    if (filters.categoryId) where.categoryId = filters.categoryId;

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
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

    const total = await this.prisma.transaction.count({ where });

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
      where: { id, userId, deletedAt: null },
      include: { account: true, category: true },
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

    return this.prisma.$transaction(async (tx) => {
      const newAccountId = dto.accountId ?? oldTransaction.accountId;
      const newType = dto.type ?? oldTransaction.type;
      const newAmount = dto.amount ?? oldTransaction.amount;

      const updated = await tx.transaction.update({
        where: { id },
        data: {
          ...dto,
          date: dto.date ? new Date(dto.date) : undefined,
        },
      });

      await tx.ledgerEntry.deleteMany({
        where: {
          referenceType: LedgerReferenceType.TRANSACTION,
          referenceId: id,
        },
      });

      if (newType === TransactionType.INCOME) {
        await this.ledgerService.registerCredit(
          userId,
          newAccountId,
          Number(newAmount),
          LedgerReferenceType.TRANSACTION,
          id,
        );
      } else {
        await this.ledgerService.registerDebit(
          userId,
          newAccountId,
          Number(newAmount),
          LedgerReferenceType.TRANSACTION,
          id,
        );
      }

      const balance = await this.ledgerService.calculateBalance(newAccountId);

      await tx.account.update({
        where: { id: newAccountId },
        data: { balance },
      });

      return updated;
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
      await tx.ledgerEntry.deleteMany({
        where: {
          referenceType: LedgerReferenceType.TRANSACTION,
          referenceId: id,
        },
      });

      const balance = await this.ledgerService.calculateBalance(
        transaction.accountId,
      );

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance },
      });

      await tx.transaction.delete({
        where: { id },
      });

      return { message: 'Transaction deleted successfully' };
    });
  }

  /*
    =====================================
    RESTORE
    =====================================
  */
  async restore(id: string, userId: string) {
    return this.prisma.transaction.updateMany({
      where: { id, userId },
      data: { deletedAt: null },
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
        deletedAt: null,
        type: TransactionType.INCOME,
      },
      _sum: { amount: true },
    });

    const expenses = await this.prisma.transaction.aggregate({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.EXPENSE,
      },
      _sum: { amount: true },
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
