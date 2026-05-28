import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InvoiceStatus,
  LedgerEntryType,
  LedgerReferenceType,
  TransactionType,
} from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CreditCardInvoiceEngineService } from './services/credit-card-invoice-engine.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { PayInvoiceDto } from './dto/pay-invoice.dto';

import {
  decimalToNumber,
  sumMoney,
  subtractMoney,
} from '@/common/utils/money.util';

@Injectable()
export class CreditCardInvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceEngine: CreditCardInvoiceEngineService,
  ) {}

  /*
  =====================================
  CREATE INVOICE
  =====================================
  */
  async create(userId: string, dto: CreateInvoiceDto) {
    const card = await this.prisma.creditCard.findFirst({
      where: {
        id: dto.creditCardId,
        userId,
        deletedAt: null,
      },
    });

    if (!card) {
      throw new BadRequestException('Credit card not found');
    }

    return this.prisma.creditCardInvoice.create({
      data: {
        referenceMonth: dto.referenceMonth,
        dueDate: new Date(dto.dueDate),
        creditCardId: dto.creditCardId,
        status: InvoiceStatus.OPEN,
      },
    });
  }

  /*
  =====================================
  LIST INVOICES
  =====================================
  */
  async findAll(userId: string) {
    const invoices = await this.prisma.creditCardInvoice.findMany({
      where: {
        deletedAt: null,
        creditCard: { userId },
      },
      include: {
        creditCard: true,
        transactions: {
          include: { category: true, account: true },
          orderBy: { date: 'desc' },
        },
      },
      orderBy: { dueDate: 'desc' },
    });

    return invoices.map((invoice) => {
      const totalSpent = sumMoney(invoice.transactions.map((t) => t.amount));

      const availableLimit = subtractMoney(
        invoice.creditCard.limit,
        totalSpent,
      );

      return {
        id: invoice.id,
        referenceMonth: invoice.referenceMonth,
        dueDate: invoice.dueDate,
        status: invoice.status,
        totalAmount: decimalToNumber(invoice.totalAmount),
        paidAt: invoice.paidAt,
        createdAt: invoice.createdAt,

        transactionsCount: invoice.transactions.length,
        totalSpent,
        availableLimit,

        creditCard: {
          id: invoice.creditCard.id,
          name: invoice.creditCard.name,
          bank: invoice.creditCard.bank,
          brand: invoice.creditCard.brand,
          limit: decimalToNumber(invoice.creditCard.limit),
        },

        transactions: invoice.transactions,
      };
    });
  }

  /*
  =====================================
  FIND ONE
  =====================================
  */
  async findOne(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,
        deletedAt: null,
        creditCard: { userId },
      },
      include: {
        creditCard: true,
        transactions: {
          include: { category: true, account: true },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const totalSpent = sumMoney(invoice.transactions.map((t) => t.amount));

    const categorySummary = invoice.transactions.reduce<
      Record<string, { categoryId: string; category: string; total: number }>
    >((acc, t) => {
      const id = t.category.id;

      if (!acc[id]) {
        acc[id] = {
          categoryId: id,
          category: t.category.name,
          total: 0,
        };
      }

      acc[id].total += decimalToNumber(t.amount);
      return acc;
    }, {});

    const availableLimit = subtractMoney(invoice.creditCard.limit, totalSpent);

    return {
      id: invoice.id,
      referenceMonth: invoice.referenceMonth,
      dueDate: invoice.dueDate,
      status: invoice.status,
      totalAmount: decimalToNumber(invoice.totalAmount),
      paidAt: invoice.paidAt,
      createdAt: invoice.createdAt,

      totalSpent,
      availableLimit,

      transactionsCount: invoice.transactions.length,
      categorySummary: Object.values(categorySummary),

      creditCard: {
        id: invoice.creditCard.id,
        name: invoice.creditCard.name,
        bank: invoice.creditCard.bank,
        brand: invoice.creditCard.brand,
        limit: decimalToNumber(invoice.creditCard.limit),
      },

      transactions: invoice.transactions,
    };
  }

  /*
  =====================================
  CLOSE INVOICE
  =====================================
  */
  async closeInvoice(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,
        creditCard: { userId },
      },
    });

    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    return this.prisma.creditCardInvoice.update({
      where: { id: invoiceId },
      data: { status: InvoiceStatus.CLOSED },
    });
  }

  /*
  =====================================
  PAY INVOICE (LEDGER AS SOURCE OF TRUTH)
  =====================================
  */
  async payInvoice(invoiceId: string, userId: string, dto: PayInvoiceDto) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,
        deletedAt: null,
        creditCard: { userId },
      },
      include: { creditCard: true },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.status === InvoiceStatus.PAID) {
      throw new BadRequestException('Invoice already paid');
    }

    const paymentDate = new Date(dto.paymentDate);
    const amount = decimalToNumber(invoice.totalAmount);

    return this.prisma.$transaction(async (tx) => {
      /*
      1. DOMAIN TRANSACTION (HISTORY)
      */
      const payment = await tx.transaction.create({
        data: {
          title: `Pagamento fatura ${invoice.creditCard.name}`,
          description: `Fatura ${invoice.referenceMonth}`,
          amount,
          type: TransactionType.EXPENSE,
          date: paymentDate,
          userId,
          accountId: dto.accountId,
          categoryId: 'SYSTEM_INVOICE_PAYMENT',
          invoiceId: invoice.id,
        },
      });

      /*
      2. LEDGER (FINANCIAL SOURCE OF TRUTH)
      */
      await tx.ledgerEntry.create({
        data: {
          userId,
          accountId: dto.accountId,
          type: LedgerEntryType.DEBIT,
          referenceType: LedgerReferenceType.TRANSACTION,
          referenceId: invoice.id,
          amount,
          description: `Pagamento fatura ${invoice.referenceMonth}`,
        },
      });

      /*
      3. UPDATE INVOICE
      */
      const updated = await tx.creditCardInvoice.update({
        where: { id: invoice.id },
        data: {
          status: InvoiceStatus.PAID,
          paidAt: paymentDate,
        },
      });

      /*
      4. RECOMPUTE BALANCE FROM LEDGER
      */
      const entries = await tx.ledgerEntry.findMany({
        where: { accountId: dto.accountId },
      });

      const balance = entries.reduce((acc, e) => {
        const value = Number(e.amount);

        return e.type === LedgerEntryType.CREDIT ? acc + value : acc - value;
      }, 0);

      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance },
      });

      return {
        payment,
        invoice: updated,
      };
    });
  }

  /*
  =====================================
  CLOSE EXPIRED
  =====================================
  */
  async closeExpiredInvoices() {
    return this.invoiceEngine.closeExpiredInvoices();
  }
}
