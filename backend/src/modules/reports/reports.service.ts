import { Injectable } from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { FinancialReportDto } from './dto/financial-report.dto';
import { VehicleReportDto } from './dto/vehicle-report.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =========================
    FINANCIAL SUMMARY
    =========================
  */
  async financialSummary(userId: string, query: FinancialReportDto) {
    const where = {
      userId,

      ...(query.accountId && {
        accountId: query.accountId,
      }),

      ...(query.categoryId && {
        categoryId: query.categoryId,
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
      INCOME
    */
    const incomes = await this.prisma.transaction.aggregate({
      where: {
        ...where,
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
        ...where,
        type: TransactionType.EXPENSE,
      },

      _sum: {
        amount: true,
      },
    });

    /*
      TOP CATEGORIES
    */
    const topCategories = await this.prisma.transaction.groupBy({
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

    return {
      income: incomes._sum.amount ?? 0,

      expense: expenses._sum.amount ?? 0,

      balance: (incomes._sum.amount ?? 0) - (expenses._sum.amount ?? 0),

      topCategories,
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
}
