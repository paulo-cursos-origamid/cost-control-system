import { Module } from '@nestjs/common';

import { CreditCardsController } from './credit-cards.controller';

import { CreditCardsService } from './credit-cards.service';
import { CreditCardInvoicesService } from '../credit-card-invoices/credit-card-invoices.service';
import { CreditCardInvoicesModule } from '../credit-card-invoices/credit-card-invoices.module';

@Module({
  controllers: [CreditCardsController],

  providers: [CreditCardsService, CreditCardInvoicesService],

  imports: [CreditCardInvoicesModule],
})
export class CreditCardsModule {}
