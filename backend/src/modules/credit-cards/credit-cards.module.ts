import { Module } from '@nestjs/common';

import { CreditCardsController } from './credit-cards.controller';

import { CreditCardsService } from './credit-cards.service';
import { CreditCardInvoicesService } from '../credit-card-invoices/credit-card-invoices.service';

@Module({
  controllers: [CreditCardsController],

  providers: [CreditCardsService, CreditCardInvoicesService],
})
export class CreditCardsModule {}
