import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import {
  InvoiceStatus,
  LedgerReferenceType,
  TransactionType,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { LedgerService } from '@/modules/ledger/ledger.service';
import { PayInvoiceDto } from '../dto/pay-invoice.dto';

@Injectable()
export class CreditCardInvoiceEngineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ledgerService: LedgerService,
  ) {}

  /*  ATTACH TRANSACTION TO INVOICE  */
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
    1. VALIDATE CREDIT CARD
  */
    const creditCard = await tx.creditCard.findFirst({
      where: {
        id: params.creditCardId,
        userId: params.userId,
      },
    });

    if (!creditCard) {
      throw new NotFoundException('Credit card not found');
    }

    /*
    2. CALCULATE INVOICE RULES
  */
    const referenceMonth = this.getReferenceMonth(
      params.date,
      creditCard.closingDay,
    );

    /*
    3. FIND OR CREATE INVOICE (ATOMIC SAFE)
  */
    let invoice = await tx.creditCardInvoice.findFirst({
      where: {
        creditCardId: params.creditCardId,
        referenceMonth,
      },
    });

    /*
    🔥 CRITICAL LOCK: BLOCK CLOSED INVOICE
  */
    if (invoice?.status === InvoiceStatus.CLOSED) {
      throw new BadRequestException(
        'Cannot add transactions to a closed invoice',
      );
    }

    /*
    4. CREATE IF NOT EXISTS
  */
    const isClosed = this.isInvoiceClosed(params.date, creditCard.closingDay);

    if (!invoice) {
      invoice = await tx.creditCardInvoice.create({
        data: {
          creditCardId: params.creditCardId,
          referenceMonth,
          dueDate: this.calculateDueDate(
            params.date,
            creditCard.closingDay,
            creditCard.dueDay,
          ),
          status: isClosed ? InvoiceStatus.CLOSED : InvoiceStatus.OPEN,
          totalAmount: 0,
        },
      });
    }

    /*
    5. SAFETY CHECK: PREVENT DOUBLE LINK
  */
    const alreadyLinked = await tx.transaction.findFirst({
      where: {
        id: params.transactionId,
        invoiceId: invoice.id,
      },
    });

    if (alreadyLinked) {
      return invoice; // idempotência
    }

    /*
    6. ATTACH TRANSACTION
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
    7. UPDATE TOTAL (SAFE INCREMENT)
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

  /*  PAY INVOICE  */
  async payInvoice(userId: string, invoiceId: string, dto: PayInvoiceDto) {
    /*
    FIND INVOICE
  */
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,
        creditCard: {
          userId,
        },
      },

      include: {
        creditCard: true,
        transactions: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    /*
    VALIDATE STATUS
  */
    if (invoice.status === InvoiceStatus.PAID) {
      throw new BadRequestException('Invoice already paid');
    }

    /*
    VALIDATE ACCOUNT
  */
    const account = await this.prisma.account.findFirst({
      where: {
        id: dto.accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.prisma.$transaction(async (tx) => {
      /*
      CREATE PAYMENT TRANSACTION
    */

      const firstTransaction = invoice.transactions[0];

      if (!firstTransaction) {
        throw new NotFoundException('Invoice does not contain transactions');
      }

      const transaction = await tx.transaction.create({
        data: {
          title: `Pagamento fatura ${invoice.creditCard.name}`,

          description: `Pagamento da fatura ${invoice.referenceMonth}`,

          amount: invoice.totalAmount,

          type: TransactionType.EXPENSE,

          date: new Date(dto.paymentDate),

          userId,

          accountId: dto.accountId,

          categoryId: firstTransaction.categoryId,
        },
      });
      /*
      REGISTER LEDGER ENTRY
    */
      await this.ledgerService.registerDebit(
        userId,
        dto.accountId,
        invoice.totalAmount,
        LedgerReferenceType.TRANSACTION,
        transaction.id,
        `Pagamento fatura ${invoice.referenceMonth}`,
      );

      /*
      RECALCULATE ACCOUNT BALANCE
    */
      const balance = await this.ledgerService.calculateBalance(dto.accountId);

      await tx.account.update({
        where: {
          id: dto.accountId,
        },

        data: {
          balance,
        },
      });

      /*
      UPDATE INVOICE
    */
      const updatedInvoice = await tx.creditCardInvoice.update({
        where: {
          id: invoiceId,
        },

        data: {
          status: InvoiceStatus.PAID,

          paidAt: new Date(dto.paymentDate),
        },
      });

      return {
        invoice: updatedInvoice,
        paymentTransaction: transaction,
      };
    });
  }

  /* CLOSE EXPIRED INVOICES  */
  async closeExpiredInvoices() {
    const today = new Date();

    const invoices = await this.prisma.creditCardInvoice.findMany({
      where: {
        status: InvoiceStatus.OPEN,
      },
      include: {
        creditCard: true,
      },
    });

    const toClose = invoices.filter((invoice) => {
      const [year, month] = invoice.referenceMonth.split('-').map(Number);

      const closingDate = new Date(
        year,
        month - 1,
        invoice.creditCard.closingDay,
        23,
        59,
        59,
        999,
      );

      return today > closingDate;
    });

    if (toClose.length === 0) {
      return { message: 'No invoices to close' };
    }

    await this.prisma.$transaction(
      toClose.map((invoice) =>
        this.prisma.creditCardInvoice.update({
          where: { id: invoice.id },
          data: {
            status: InvoiceStatus.CLOSED,
          },
        }),
      ),
    );

    return {
      message: `${toClose.length} invoices closed`,
    };
  }
  /*
    GET REFERENCE MONTH
  */
  private getReferenceMonth(purchaseDate: Date, closingDay: number): string {
    const date = new Date(purchaseDate);

    /*
      AFTER CLOSING DAY -> NEXT INVOICE
    */
    if (date.getDate() > closingDay) {
      date.setMonth(date.getMonth() + 1);
    }

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  }

  /*
    CALCULATE DUE DATE
  */
  private calculateDueDate(
    purchaseDate: Date,
    closingDay: number,
    dueDay: number,
  ) {
    const dueDate = new Date(purchaseDate);

    /*
      PURCHASE AFTER CLOSING
      GOES TO NEXT INVOICE
    */
    if (purchaseDate.getDate() > closingDay) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }

    /*
      INVOICE DUE MONTH
    */
    dueDate.setMonth(dueDate.getMonth() + 1);

    dueDate.setDate(dueDay);

    return dueDate;
  }

  /*
    CHECK IF INVOICE IS CLOSED
  */
  private isInvoiceClosed(purchaseDate: Date, closingDay: number): boolean {
    return purchaseDate.getDate() > closingDay;
  }
}
