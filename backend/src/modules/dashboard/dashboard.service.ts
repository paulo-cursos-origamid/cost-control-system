import { Injectable } from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =====================================
    DASHBOARD FINANCEIRO
    =====================================
  */
  async financial(userId: string) {
    /*
      ENTRADAS
    */
    const incomes = await this.prisma.transaction.aggregate({
      where: {
        userId,
        type: TransactionType.INCOME,
      },

      _sum: {
        amount: true,
      },
    });

    /*
      SAÍDAS
    */
    const expenses = await this.prisma.transaction.aggregate({
      where: {
        userId,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },
    });

    /*
      CONTAS
    */
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    /*
      ÚLTIMAS TRANSAÇÕES
    */
    const latestTransactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },

      include: {
        category: true,
        account: true,
      },

      orderBy: {
        date: 'desc',
      },

      take: 10,
    });

    const income = incomes._sum.amount ?? 0;

    const expense = expenses._sum.amount ?? 0;

    return {
      summary: {
        income,
        expense,
        balance: income - expense,
      },

      accounts,

      latestTransactions,
    };
  }

  /*
    =====================================
    DASHBOARD AUTOMOTIVO
    =====================================
  */
  async vehicles(userId: string) {
    /*
      VEÍCULOS
    */
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        userId,
      },

      include: {
        fuelSupplies: {
          orderBy: {
            createdAt: 'desc',
          },

          take: 5,
        },

        maintenances: {
          orderBy: {
            createdAt: 'desc',
          },

          take: 5,
        },
      },
    });

    /*
      TOTAL GASTO COM ABASTECIMENTO
    */
    const fuelExpenses = await this.prisma.fuelSupply.aggregate({
      where: {
        vehicle: {
          userId,
        },
      },

      _sum: {
        totalAmount: true,
      },
    });

    /*
      TOTAL GASTO COM MANUTENÇÃO
    */
    const maintenanceExpenses = await this.prisma.maintenance.aggregate({
      where: {
        vehicle: {
          userId,
        },
      },

      _sum: {
        cost: true,
      },
    });

    return {
      vehicles,

      costs: {
        fuel: fuelExpenses._sum.totalAmount ?? 0,

        maintenance: maintenanceExpenses._sum.cost ?? 0,

        total:
          (fuelExpenses._sum.totalAmount ?? 0) +
          (maintenanceExpenses._sum.cost ?? 0),
      },
    };
  }
}
