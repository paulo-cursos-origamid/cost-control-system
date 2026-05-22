import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FinancialSchedulerService {
  private readonly logger = new Logger(FinancialSchedulerService.name);

  log(message: string) {
    this.logger.log(message);
  }
}
