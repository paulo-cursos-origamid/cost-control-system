import { Injectable } from '@nestjs/common';

import { LedgerReferenceType } from '@prisma/client';

import { LedgerService } from '@/modules/ledger/services/ledger.service';

@Injectable()
export class FinancialReversalService {
  constructor(private readonly ledgerService: LedgerService) {}

  /*
    =====================================
    REVERSE ENTRIES
    =====================================
  */
  async reverse(referenceType: LedgerReferenceType, referenceId: string) {
    return this.ledgerService.deleteEntriesByReference(
      referenceType,
      referenceId,
    );
  }
}
