import { decimalToNumber } from '@/common/utils/decimal.util';
import { Injectable } from '@nestjs/common';

import { Prisma, TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { FinancialReportDto } from './dto/financial-report.dto';
import { VehicleReportDto } from './dto/vehicle-report.dto';
import { FinancialAnalyticsDto } from './dto/financial-analytics.dto';
@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =========================
    FINANCIAL SUMMARY
    =========================
  */
  async financialSummary(userId: string, query: FinancialReportDto) {
    /*
      BASE WHERE
    */
    const where: Prisma.TransactionWhereInput = {
      userId,
      deletedAt: null,
    };

    /*
      FILTERS
    */
    if (query.accountId) {
      where.accountId = query.accountId;
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    /*
      DATE FILTER
    */
    if (query.startDate || query.endDate) {
      where.date = {};

      if (query.startDate) {
        where.date.gte = new Date(query.startDate);
      }

      if (query.endDate) {
        where.date.lte = new Date(query.endDate);
      }
    }

    /*
      =========================
      INCOME
      =========================
    */
    const incomes = await this.prisma.transaction.aggregate({
      where: {
        ...where,
        type: TransactionType.INCOME,
      },

      _sum: {
        amount: true,
      },

      _avg: {
        amount: true,
      },

      _count: true,
    });

    /*
      =========================
      EXPENSE
      =========================
    */
    const expenses = await this.prisma.transaction.aggregate({
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },

      _avg: {
        amount: true,
      },

      _count: true,
    });

    /*
      =========================
      TOP CATEGORIES
      =========================
    */
    const groupedCategories = await this.prisma.transaction.groupBy({
      by: ['categoryId'],

      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },

      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },

      take: 5,
    });
    const formattedTopCategories = await Promise.all(
      groupedCategories.map(async (item) => {
        const category = await this.prisma.category.findUnique({
          where: {
            id: item.categoryId,
          },
        });

        return {
          category,
          total: item._sum.amount ?? 0,
        };
      }),
    );

    /*
      =========================
      MONTHLY EVOLUTION
      =========================
    */
    const transactions = await this.prisma.transaction.findMany({
      where,

      orderBy: {
        date: 'asc',
      },
    });

    const monthlyMap: Record<
      string,
      {
        income: number;
        expense: number;
      }
    > = {};

    for (const transaction of transactions) {
      const monthKey = transaction.date.toISOString().slice(0, 7);

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        monthlyMap[monthKey].income += decimalToNumber(transaction.amount);
      }

      if (transaction.type === TransactionType.EXPENSE) {
        monthlyMap[monthKey].expense += decimalToNumber(transaction.amount);
      }
    }

    const monthlyEvolution = Object.entries(monthlyMap).map(
      ([month, values]) => ({
        month,

        income: values.income,

        expense: values.expense,

        balance: values.income - values.expense,
      }),
    );

    /*
      =========================
      LATEST TRANSACTIONS
      =========================
    */
    const latestTransactions = await this.prisma.transaction.findMany({
      where,

      include: {
        category: true,
        account: true,
      },

      orderBy: {
        date: 'desc',
      },

      take: 10,
    });

    /*
      =========================
      RESPONSE
      =========================
    */
    const totalIncome = incomes._sum.amount ?? 0;

    const totalExpense = expenses._sum.amount ?? 0;

    return {
      summary: {
        income: totalIncome,

        expense: totalExpense,

        balance: decimalToNumber(totalIncome) - decimalToNumber(totalExpense),

        transactionsCount: incomes._count + expenses._count,

        averageIncome: incomes._avg.amount ?? 0,

        averageExpense: expenses._avg.amount ?? 0,
      },

      topCategories: formattedTopCategories,

      monthlyEvolution,

      latestTransactions,
    };
  }

  /*
    =========================
    VEHICLES SUMMARY
    =========================
  */
  async vehiclesSummary(userId: string, query: VehicleReportDto) {
    /*
      FUELS
    */
    const fuelSupplies = await this.prisma.fuelSupply.findMany({
      where: {
        vehicle: {
          userId,
        },

        ...(query.vehicleId && {
          vehicleId: query.vehicleId,
        }),
      },

      include: {
        vehicle: true,
      },
    });

    /*
      MAINTENANCES
    */
    const maintenances = await this.prisma.maintenance.findMany({
      where: {
        vehicle: {
          userId,
        },

        ...(query.vehicleId && {
          vehicleId: query.vehicleId,
        }),
      },

      include: {
        vehicle: true,
      },
    });

    /*
      TOTALS
    */
    const totalFuelCost = fuelSupplies.reduce(
      (acc, item) => acc + item.totalAmount,
      0,
    );

    const totalMaintenanceCost = maintenances.reduce(
      (acc, item) => acc + item.cost,
      0,
    );

    return {
      totalFuelCost,

      totalMaintenanceCost,

      totalVehicleCost: totalFuelCost + totalMaintenanceCost,

      fuelSupplies: fuelSupplies.length,

      maintenances: maintenances.length,
    };
  }

  /*
  =========================
  FINANCIAL ANALYTICS
  =========================
*/
  async financialAnalytics(userId: string, query: FinancialAnalyticsDto) {
    const where = {
      userId,
      deletedAt: null,

      ...(query.accountId && {
        accountId: query.accountId,
      }),

      ...(query.startDate &&
        query.endDate && {
          date: {
            gte: new Date(query.startDate),
            lte: new Date(query.endDate),
          },
        }),
    };

    /*
    TRANSACTIONS BY MONTH
  */
    const transactions = await this.prisma.transaction.findMany({
      where,

      orderBy: {
        date: 'asc',
      },
    });

    /*
    GROUP MONTHS
  */
    const monthly = transactions.reduce<
      Record<
        string,
        {
          income: number;
          expense: number;
        }
      >
    >((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7);

      if (!acc[month]) {
        acc[month] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        acc[month].income += decimalToNumber(transaction.amount);
      }

      if (transaction.type === TransactionType.EXPENSE) {
        acc[month].expense += decimalToNumber(transaction.amount);
      }

      return acc;
    }, {});

    /*
    CONVERT ARRAY
  */
    const analytics = Object.entries(monthly).map(([month, values]) => ({
      month,

      income: values.income,

      expense: values.expense,

      balance: values.income - values.expense,
    }));

    return analytics;
  }

  /*
  =========================
  FINANCIAL CATEGORIES
  =========================
*/
  async financialCategories(userId: string, query: FinancialReportDto) {
    /*
    BASE WHERE
  */
    const where: Prisma.TransactionWhereInput = {
      userId,
      deletedAt: null,
    };

    /*
    FILTERS
  */
    if (query.accountId) {
      where.accountId = query.accountId;
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    /*
    DATE FILTER
  */
    if (query.startDate || query.endDate) {
      where.date = {};

      if (query.startDate) {
        where.date.gte = new Date(query.startDate);
      }

      if (query.endDate) {
        where.date.lte = new Date(query.endDate);
      }
    }

    /*
    GROUP CATEGORIES
  */
    const grouped = await this.prisma.transaction.groupBy({
      by: ['categoryId', 'type'],

      where,

      _sum: {
        amount: true,
      },

      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    /*
    ENRICH DATA
  */
    const categories = await Promise.all(
      grouped.map(async (item) => {
        const category = await this.prisma.category.findUnique({
          where: {
            id: item.categoryId,
          },
        });

        return {
          categoryId: item.categoryId,

          category: category?.name ?? 'Unknown',

          type: item.type,

          amount: item._sum.amount ?? 0,
        };
      }),
    );

    return categories;
  }

  /*
  =========================
  VEHICLES ANALYTICS
  =========================
*/
  async vehiclesAnalytics(userId: string, query: VehicleReportDto) {
    /*
    VEHICLES
  */
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        userId,

        ...(query.vehicleId && {
          id: query.vehicleId,
        }),
      },

      include: {
        fuelSupplies: true,
        maintenances: true,
      },
    });

    /*
    ANALYTICS
  */
    return vehicles.map((vehicle) => {
      /*
      FUEL TOTAL
    */
      const fuelCost = vehicle.fuelSupplies.reduce(
        (acc, item) => acc + item.totalAmount,
        0,
      );

      /*
      MAINTENANCE TOTAL
    */
      const maintenanceCost = vehicle.maintenances.reduce(
        (acc, item) => acc + item.cost,
        0,
      );

      /*
      COUNTS
    */
      const fuelSupplies = vehicle.fuelSupplies.length;

      const maintenances = vehicle.maintenances.length;

      /*
      AVERAGES
    */
      const averageFuelCost = fuelSupplies > 0 ? fuelCost / fuelSupplies : 0;

      const averageMaintenanceCost =
        maintenances > 0 ? maintenanceCost / maintenances : 0;

      return {
        vehicleId: vehicle.id,

        vehicle: `${vehicle.brand} ${vehicle.model}`,

        fuelCost,

        maintenanceCost,

        totalCost: fuelCost + maintenanceCost,

        fuelSupplies,

        maintenances,

        averageFuelCost,

        averageMaintenanceCost,
      };
    });
  }

  /*
  =========================
  KPIS
  =========================
*/
  async kpis(userId: string) {
    /*
    TOTAL ACCOUNTS
  */
    const accounts = await this.prisma.account.count({
      where: {
        userId,
        deletedAt: null,
      },
    });

    /*
    TOTAL VEHICLES
  */
    const vehicles = await this.prisma.vehicle.count({
      where: {
        userId,
      },
    });

    /*
    TOTAL TRANSACTIONS
  */
    const transactions = await this.prisma.transaction.count({
      where: {
        userId,
      },
    });

    /*
    INCOME
  */
    const incomes = await this.prisma.transaction.aggregate({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.INCOME,
      },

      _sum: {
        amount: true,
      },
    });

    /*
    EXPENSE
  */
    const expenses = await this.prisma.transaction.aggregate({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },
    });

    /*
    FUEL COST
  */
    const fuelSupplies = await this.prisma.fuelSupply.aggregate({
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
    MAINTENANCE COST
  */
    const maintenances = await this.prisma.maintenance.aggregate({
      where: {
        vehicle: {
          userId,
        },
      },

      _sum: {
        cost: true,
      },
    });

    /*
    BIGGEST EXPENSE
  */
    const biggestExpense = await this.prisma.transaction.findFirst({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.EXPENSE,
      },

      orderBy: {
        amount: 'desc',
      },
    });

    /*
    BIGGEST INCOME
  */
    const biggestIncome = await this.prisma.transaction.findFirst({
      where: {
        userId,
        deletedAt: null,
        type: TransactionType.INCOME,
      },

      orderBy: {
        amount: 'desc',
      },
    });

    /*
    TOTALS
  */
    const totalIncome = incomes._sum.amount ?? 0;

    const totalExpense = expenses._sum.amount ?? 0;

    const fuelCost = fuelSupplies._sum.totalAmount ?? 0;

    const maintenanceCost = maintenances._sum.cost ?? 0;

    return {
      totalBalance:
        decimalToNumber(totalIncome) - decimalToNumber(totalExpense),

      totalIncome,

      totalExpense,

      accounts,

      vehicles,

      transactions,

      fuelCost,

      maintenanceCost,

      biggestExpense,

      biggestIncome,
    };
  }
}
