import { Injectable } from '@nestjs/common';

import { InvoiceStatus, Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CreditCardInvoiceEngineService {
  constructor(private readonly prisma: PrismaService) {}

  async attachTransactionToInvoice(
    tx: Prisma.TransactionClient,
    params: {
      userId: string;
      transactionId: string;
      creditCardId: string;
      amount: number;
      date: Date;
    },
  ) {
    /*
      REFERENCE MONTH
    */
    const referenceMonth = this.getReferenceMonth(params.date);

    /*
      FIND OPEN INVOICE
    */
    let invoice = await tx.creditCardInvoice.findFirst({
      where: {
        creditCardId: params.creditCardId,
        referenceMonth,
        status: InvoiceStatus.OPEN,
      },
    });

    /*
      CREATE INVOICE IF NOT EXISTS
    */
    if (!invoice) {
      invoice = await tx.creditCardInvoice.create({
        data: {
          creditCardId: params.creditCardId,

          referenceMonth,

          dueDate: this.calculateDueDate(params.date),

          status: InvoiceStatus.OPEN,

          totalAmount: 0,
        },
      });
    }

    /*
      ATTACH TRANSACTION TO INVOICE
    */
    await tx.transaction.update({
      where: {
        id: params.transactionId,
      },

      data: {
        invoiceId: invoice.id,
      },
    });

    /*
      UPDATE INVOICE TOTAL
    */
    await tx.creditCardInvoice.update({
      where: {
        id: invoice.id,
      },

      data: {
        totalAmount: {
          increment: params.amount,
        },
      },
    });

    return invoice;
  }

  /*
    GET REFERENCE MONTH
  */
  private getReferenceMonth(date: Date) {
    return date.toISOString().slice(0, 7);
  }

  /*
    CALCULATE DUE DATE
  */
  private calculateDueDate(date: Date) {
    const dueDate = new Date(date);

    dueDate.setMonth(dueDate.getMonth() + 1);

    dueDate.setDate(10);

    return dueDate;
  }
}
