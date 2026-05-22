import { Injectable, Logger } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RecurringTransactionsProcessor {
  private readonly logger = new Logger(RecurringTransactionsProcessor.name);

  /*
    EXECUTA TODO MINUTO
  */
  @Cron(CronExpression.EVERY_MINUTE)
  handleRecurringTransactions() {
    this.logger.log('Processing recurring transactions...');
  }
}
