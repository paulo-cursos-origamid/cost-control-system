import { Injectable } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { FindTransactionsDto } from '../dto/find-transactions.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

import { TransactionProcessorService } from './transaction-processor.service';
import { TransactionUpdateService } from './transaction-update.service';
import { PrismaService } from '@/database/prisma.service';
import { TransactionDeleteService } from './transaction-delete.service';
import { TransactionQueryService } from './transaction-query.service';
import { LedgerTransactionBalanceService } from '@/modules/ledger/services/ledger-transaction-balance.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly processor: TransactionProcessorService,
    private readonly updater: TransactionUpdateService,
    private readonly deleter: TransactionDeleteService,
    private readonly query: TransactionQueryService,
    private readonly balanceService: LedgerTransactionBalanceService,
  ) {}

  /*
    =====================================
    CREATE
    =====================================
  */
  async create(userId: string, dto: CreateTransactionDto) {
    return this.processor.create(userId, dto);
  }
  /*
    =====================================
    FIND ALL
    =====================================
  */
  async findAll(userId: string, filters: FindTransactionsDto) {
    return this.query.findAll(userId, filters);
  }

  /*
    =====================================
    FIND ONE
    =====================================
  */
  async findOne(id: string, userId: string) {
    return this.query.findOne(id, userId);
  }

  /*
    =====================================
    UPDATE
    =====================================
  */
  async update(id: string, userId: string, dto: UpdateTransactionDto) {
    return this.updater.execute(id, userId, dto);
  }

  /*
    =====================================
    REMOVE
    =====================================
  */
  async remove(id: string, userId: string) {
    return this.deleter.execute(id, userId);
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
    return this.query.summary(userId);
  }
}
