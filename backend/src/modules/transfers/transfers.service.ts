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
      Buscar conta origem
    */
    const fromAccount = await this.prisma.account.findFirst({
      where: {
        id: data.fromAccountId,
        userId,
      },
    });

    /*
      Buscar conta destino
    */
    const toAccount = await this.prisma.account.findFirst({
      where: {
        id: data.toAccountId,
        userId,
      },
    });

    /*
      Validar contas
    */
    if (!fromAccount || !toAccount) {
      throw new BadRequestException('Conta inválida');
    }

    /*
      Validar saldo
    */
    if (fromAccount.balance < data.amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    /*
      Executar transferência
    */
    return await this.prisma.$transaction(async (tx) => {
      /*
          Debitar origem
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
          Creditar destino
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
          Registrar transferência
        */
      return await tx.transfer.create({
        data: {
          amount: data.amount,
          description: data.description,

          userId,

          fromAccountId: fromAccount.id,

          toAccountId: toAccount.id,
        },
      });
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
