import { Injectable, Logger } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '@/database/prisma.service';

import { LedgerService } from '@/modules/ledger/ledger.service';

import { TransactionsService } from '@/modules/transactions/services/transactions.service';

import { RecurringTransactionsService } from '@/modules/recurring-transactions/recurring-transactions.service';

@Injectable()
export class RecurringTransactionsProcessor {
  private readonly logger = new Logger(RecurringTransactionsProcessor.name);

  constructor(
    private readonly prisma: PrismaService,

    private readonly transactionsService: TransactionsService,

    private readonly ledgerService: LedgerService,

    private readonly recurringTransactionsService: RecurringTransactionsService,
  ) {}

  /*
    EXECUTA TODO MINUTO
  */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleRecurringTransactions() {
    this.logger.log('Processing recurring transactions...');

    /*
      BUSCA RECORRÊNCIAS VENCIDAS
    */
    const recurringTransactions =
      await this.prisma.recurringTransaction.findMany({
        where: {
          active: true,

          nextExecution: {
            lte: new Date(),
          },
        },
      });

    this.logger.log(
      `Found ${recurringTransactions.length} recurring transactions`,
    );

    /*
      PROCESSA CADA RECORRÊNCIA
    */
    for (const recurring of recurringTransactions) {
      try {
        /*
          CRIA TRANSACTION
        */
        const transaction = await this.transactionsService.create(
          recurring.userId,
          {
            title: recurring.title,

            description: recurring.description ?? undefined,

            amount: Number(recurring.amount),

            type: recurring.type,

            date: recurring.nextExecution.toISOString(),

            accountId: recurring.accountId,

            categoryId: recurring.categoryId,
          },
        );

        this.logger.log(`Transaction created: ${transaction.id}`);

        /*
          CALCULA PRÓXIMA EXECUÇÃO
        */
        const nextExecution =
          this.recurringTransactionsService.calculateNextExecution(
            recurring.nextExecution,
            recurring.frequency,
          );

        /*
          ATUALIZA RECORRÊNCIA
        */
        await this.prisma.recurringTransaction.update({
          where: {
            id: recurring.id,
          },

          data: {
            nextExecution,
          },
        });

        this.logger.log(`Recurring transaction updated: ${recurring.id}`);
      } catch (error) {
        this.logger.error(
          `Error processing recurring transaction ${recurring.id}`,
          error,
        );
      }
    }
  }
}
