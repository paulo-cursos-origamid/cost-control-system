import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    Criar transferência
  */
  async create(userId: string, data: CreateTransferDto) {
    /*
    VALIDAR VALOR
  */
    if (data.amount <= 0) {
      throw new BadRequestException(
        'O valor da transferência deve ser maior que zero',
      );
    }

    /*
    VALIDAR CONTAS DIFERENTES
  */
    if (data.fromAccountId === data.toAccountId) {
      throw new BadRequestException(
        'A conta de origem e destino devem ser diferentes',
      );
    }

    /*
    TRANSACTION
  */
    return this.prisma.$transaction(async (tx) => {
      /*
      BUSCAR CONTA ORIGEM
    */
      const fromAccount = await tx.account.findFirst({
        where: {
          id: data.fromAccountId,
          userId,
          deletedAt: null,
          isActive: true,
        },
      });

      /*
      BUSCAR CONTA DESTINO
    */
      const toAccount = await tx.account.findFirst({
        where: {
          id: data.toAccountId,
          userId,
          deletedAt: null,
          isActive: true,
        },
      });

      /*
      VALIDAR CONTAS
    */
      if (!fromAccount || !toAccount) {
        throw new BadRequestException('Conta inválida');
      }

      /*
      VALIDAR SALDO
    */
      if (fromAccount.balance < data.amount) {
        throw new BadRequestException('Saldo insuficiente');
      }

      /*
      DEBITAR ORIGEM
    */
      await tx.account.update({
        where: {
          id: fromAccount.id,
        },

        data: {
          balance: {
            decrement: data.amount,
          },
        },
      });

      /*
      CREDITAR DESTINO
    */
      await tx.account.update({
        where: {
          id: toAccount.id,
        },

        data: {
          balance: {
            increment: data.amount,
          },
        },
      });

      /*
      REGISTRAR TRANSFERÊNCIA
    */
      const transfer = await tx.transfer.create({
        data: {
          amount: data.amount,

          description: data.description,

          userId,

          fromAccountId: fromAccount.id,

          toAccountId: toAccount.id,
        },

        include: {
          fromAccount: true,
          toAccount: true,
        },
      });

      return transfer;
    });
  }

  /*
    Listar transferências
  */
  async findAll(userId: string) {
    return await this.prisma.transfer.findMany({
      where: {
        userId,
      },

      include: {
        fromAccount: true,
        toAccount: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
