import { Injectable } from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =========================
    FINANCIAL DASHBOARD
    =========================
  */
  async financial(userId: string) {
    /*
      INCOMES
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
      EXPENSES
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
      ACCOUNTS
    */
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
      },
    });

    /*
      RECENT TRANSACTIONS
    */
    const recentTransactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },

      include: {
        account: true,
        category: true,
      },

      orderBy: {
        date: 'desc',
      },

      take: 10,
    });

    /*
      EXPENSES BY CATEGORY
    */
    const expensesByCategory = await this.prisma.transaction.groupBy({
      by: ['categoryId'],

      where: {
        userId,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },
    });

    const income = incomes._sum.amount ?? 0;

    const expense = expenses._sum.amount ?? 0;

    const accountsBalance = accounts.reduce(
      (acc, account) => acc + account.balance,
      0,
    );

    return {
      summary: {
        income,
        expense,
        balance: income - expense,
        accountsBalance,
      },

      accounts,

      recentTransactions,

      expensesByCategory,
    };
  }

  /*
    =========================
    VEHICLES DASHBOARD
    =========================
  */
  async vehicles(userId: string) {
    /*
      VEHICLES
    */
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        userId,
      },

      include: {
        fuelSupplies: true,
        maintenances: true,
      },
    });

    /*
      TOTAL FUEL COST
    */
    const fuelCost = await this.prisma.fuelSupply.aggregate({
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
      TOTAL MAINTENANCE COST
    */
    const maintenanceCost = await this.prisma.maintenance.aggregate({
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
        fuel: fuelCost._sum.totalAmount ?? 0,

        maintenance: maintenanceCost._sum.cost ?? 0,

        total:
          (fuelCost._sum.totalAmount ?? 0) + (maintenanceCost._sum.cost ?? 0),
      },
    };
  }
}
