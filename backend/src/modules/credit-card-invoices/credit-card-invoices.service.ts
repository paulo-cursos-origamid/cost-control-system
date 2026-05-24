import { PayInvoiceDto } from './dto/pay-invoice.dto';

import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { InvoiceStatus } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class CreditCardInvoicesService {
  constructor(private readonly prisma: PrismaService) {}

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
    return await this.prisma.creditCardInvoice.findMany({
      where: {
        creditCard: {
          userId,
        },

        deletedAt: null,
      },

      include: {
        creditCard: true,
      },

      orderBy: {
        dueDate: 'asc',
      },
    });
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

  // async payInvoice(userId: string, invoiceId: string) {
  //   const invoice = await this.prisma.creditCardInvoice.findFirst({
  //     where: {
  //       id: invoiceId,

  //       creditCard: {
  //         userId,
  //       },
  //     },
  //   });

  //   if (!invoice) {
  //     throw new BadRequestException('Invoice not found');
  //   }

  //   return await this.prisma.creditCardInvoice.update({
  //     where: {
  //       id: invoiceId,
  //     },

  //     data: {
  //       status: InvoiceStatus.PAID,

  //       paidAt: new Date(),
  //     },
  //   });
  // }

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
}
