import { Injectable } from '@nestjs/common';

import { AccountBalanceService } from '@/modules/ledger/services/account-balance.service';

@Injectable()
export class FinancialBalanceService {
  constructor(private readonly balanceService: AccountBalanceService) {}

  /*
    =====================================
    RECALCULATE ACCOUNT
    =====================================
  */
  async recalculate(accountId: string) {
    return this.balanceService.recalculate(accountId);
  }

  /*
    =====================================
    RECALCULATE MANY
    =====================================
  */
  async recalculateMany(accountIds: string[]) {
    return this.balanceService.recalculateMany(accountIds);
  }
}
