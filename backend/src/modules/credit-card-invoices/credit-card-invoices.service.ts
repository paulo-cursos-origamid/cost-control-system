import { PayInvoiceDto } from './dto/pay-invoice.dto';

import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { InvoiceStatus } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreditCardInvoiceEngineService } from './services/credit-card-invoice-engine.service';

@Injectable()
export class CreditCardInvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceEngine: CreditCardInvoiceEngineService,
  ) {}

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

    return await this.prisma.creditCardInvoice.create({
      data: {
        referenceMonth: dto.referenceMonth,

        dueDate: new Date(dto.dueDate),

        creditCardId: dto.creditCardId,

        status: InvoiceStatus.OPEN,
      },
    });
  }

  async findAll(userId: string) {
    const invoices = await this.prisma.creditCardInvoice.findMany({
      where: {
        deletedAt: null,

        creditCard: {
          userId,
        },
      },

      include: {
        creditCard: true,

        transactions: {
          include: {
            category: true,
            account: true,
          },

          orderBy: {
            date: 'desc',
          },
        },
      },

      orderBy: {
        dueDate: 'desc',
      },
    });

    return invoices.map((invoice) => {
      const transactionsCount = invoice.transactions.length;

      const totalSpent = invoice.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      );

      const availableLimit = invoice.creditCard.limit - totalSpent;

      return {
        id: invoice.id,

        referenceMonth: invoice.referenceMonth,

        dueDate: invoice.dueDate,

        status: invoice.status,

        totalAmount: invoice.totalAmount,

        paidAt: invoice.paidAt,

        createdAt: invoice.createdAt,

        transactionsCount,

        totalSpent,

        availableLimit,

        creditCard: {
          id: invoice.creditCard.id,

          name: invoice.creditCard.name,

          bank: invoice.creditCard.bank,

          brand: invoice.creditCard.brand,

          limit: invoice.creditCard.limit,
        },

        transactions: invoice.transactions,
      };
    });
  }

  async findOne(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,

        deletedAt: null,

        creditCard: {
          userId,
        },
      },

      include: {
        creditCard: true,

        transactions: {
          include: {
            category: true,
            account: true,
          },

          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    /*
    TOTALS
  */
    const totalSpent = invoice.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    /*
    GROUP BY CATEGORY
  */
    const categorySummary = invoice.transactions.reduce<
      Record<
        string,
        {
          categoryId: string;
          category: string;
          total: number;
        }
      >
    >((acc, transaction) => {
      const categoryId = transaction.category.id;

      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,

          category: transaction.category.name,

          total: 0,
        };
      }

      acc[categoryId].total += transaction.amount;

      return acc;
    }, {});

    /*
    AVAILABLE LIMIT
  */
    const availableLimit = invoice.creditCard.limit - totalSpent;

    return {
      id: invoice.id,

      referenceMonth: invoice.referenceMonth,

      dueDate: invoice.dueDate,

      status: invoice.status,

      totalAmount: invoice.totalAmount,

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

        limit: invoice.creditCard.limit,
      },

      transactions: invoice.transactions,
    };
  }
  async closeInvoice(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,

        creditCard: {
          userId,
        },
      },
    });

    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    return await this.prisma.creditCardInvoice.update({
      where: {
        id: invoiceId,
      },

      data: {
        status: InvoiceStatus.CLOSED,
      },
    });
  }
  async payInvoice(invoiceId: string, userId: string, dto: PayInvoiceDto) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: {
        id: invoiceId,

        deletedAt: null,

        creditCard: {
          userId,
        },
      },

      include: {
        creditCard: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.status === 'PAID') {
      throw new BadRequestException('Invoice already paid');
    }

    /*
    CRIA TRANSACTION DE PAGAMENTO
  */
    await this.prisma.transaction.create({
      data: {
        title: `Pagamento fatura ${invoice.creditCard.name}`,

        description: `Fatura ${invoice.referenceMonth}`,

        amount: invoice.totalAmount,

        type: 'EXPENSE',

        date: new Date(dto.paymentDate),

        userId,

        accountId: dto.accountId,

        /*
          TEMPORÁRIO
          DEPOIS TEREMOS CONFIGURAÇÃO GLOBAL
        */
        categoryId: 'COLOQUE_AQUI_UMA_CATEGORIA_REAL',

        invoiceId: invoice.id,
      },
    });

    /*
    MARCA FATURA COMO PAGA
  */
    return this.prisma.creditCardInvoice.update({
      where: {
        id: invoice.id,
      },

      data: {
        status: 'PAID',

        paidAt: new Date(dto.paymentDate),

        // paymentTransactionId: transaction.id,
      },
    });
  }

  async closeExpiredInvoices() {
    return this.invoiceEngine.closeExpiredInvoices();
  }
}
