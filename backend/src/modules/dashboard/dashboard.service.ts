import { Injectable } from '@nestjs/common';

import { TransactionType } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  /*
    =====================================
    DASHBOARD FINANCEIRO CALCULATE GROWTH
    =====================================
  */
  private calculateGrowth(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    return Number((((current - previous) / previous) * 100).toFixed(1));
  }

  /*
  =====================================
  DASHBOARD FINANCEIRO
  =====================================
*/
  async financial(userId: string) {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    const previousMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );

    const [
      incomes,
      expenses,

      currentIncome,
      previousIncome,

      currentExpense,
      previousExpense,

      accounts,

      latestTransactions,

      topCategories,
    ] = await Promise.all([
      /*
      TOTAL GERAL RECEITAS
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.INCOME,
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      TOTAL GERAL DESPESAS
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.EXPENSE,
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      RECEITAS MÊS ATUAL
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.INCOME,
          date: {
            gte: currentMonthStart,
          },
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      RECEITAS MÊS ANTERIOR
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.INCOME,
          date: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      DESPESAS MÊS ATUAL
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.EXPENSE,
          date: {
            gte: currentMonthStart,
          },
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      DESPESAS MÊS ANTERIOR
    */
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.EXPENSE,
          date: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },

        _sum: {
          amount: true,
        },
      }),

      /*
      CONTAS
    */
      this.prisma.account.findMany({
        where: {
          userId,
        },

        orderBy: {
          createdAt: 'desc',
        },
      }),

      /*
      ÚLTIMAS TRANSAÇÕES
    */
      this.prisma.transaction.findMany({
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
      }),

      /*
      TOP CATEGORIAS
    */
      this.prisma.transaction.groupBy({
        by: ['categoryId'],

        where: {
          userId,
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
      }),
    ]);

    const categories = await Promise.all(
      topCategories.map(async (item) => {
        const category = await this.prisma.category.findUnique({
          where: {
            id: item.categoryId,
          },
        });

        return {
          categoryId: item.categoryId,
          categoryName: category?.name ?? 'Sem categoria',
          total: item._sum.amount ?? 0,
        };
      }),
    );

    const income = incomes._sum.amount ?? 0;

    const expense = expenses._sum.amount ?? 0;

    const comparison = {
      income: {
        current: currentIncome._sum.amount ?? 0,
        previous: previousIncome._sum.amount ?? 0,
      },

      expense: {
        current: currentExpense._sum.amount ?? 0,
        previous: previousExpense._sum.amount ?? 0,
      },

      balance: {
        current:
          (currentIncome._sum.amount ?? 0) - (currentExpense._sum.amount ?? 0),

        previous:
          (previousIncome._sum.amount ?? 0) -
          (previousExpense._sum.amount ?? 0),
      },
    };

    return {
      summary: {
        income,
        expense,
        balance: income - expense,
      },

      comparison,

      growth: {
        income: this.calculateGrowth(
          comparison.income.current,
          comparison.income.previous,
        ),

        expense: this.calculateGrowth(
          comparison.expense.current,
          comparison.expense.previous,
        ),

        balance: this.calculateGrowth(
          comparison.balance.current,
          comparison.balance.previous,
        ),
      },

      accounts,

      latestTransactions,

      topCategories: categories,
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

    /*
      ÚLTIMOS ABASTECIMENTOS
    */
    const latestFuelSupplies = await this.prisma.fuelSupply.findMany({
      where: {
        vehicle: {
          userId,
        },
      },

      include: {
        vehicle: true,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 10,
    });

    /*
      ÚLTIMAS MANUTENÇÕES
    */
    const latestMaintenances = await this.prisma.maintenance.findMany({
      where: {
        vehicle: {
          userId,
        },
      },

      include: {
        vehicle: true,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 10,
    });

    return {
      vehicles,

      latestFuelSupplies,

      latestMaintenances,

      costs: {
        fuel: fuelExpenses._sum.totalAmount ?? 0,

        maintenance: maintenanceExpenses._sum.cost ?? 0,

        total:
          (fuelExpenses._sum.totalAmount ?? 0) +
          (maintenanceExpenses._sum.cost ?? 0),
      },
    };
  }

  /*
    =====================================
    DASHBOARD CARDS
    =====================================
  */
  async cards(userId: string) {
    const [incomes, expenses, accounts, vehicles, transactions] =
      await Promise.all([
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: TransactionType.INCOME,
          },

          _sum: {
            amount: true,
          },
        }),

        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: TransactionType.EXPENSE,
          },

          _sum: {
            amount: true,
          },
        }),

        this.prisma.account.count({
          where: { userId },
        }),

        this.prisma.vehicle.count({
          where: { userId },
        }),

        this.prisma.transaction.count({
          where: { userId },
        }),
      ]);

    const income = incomes._sum.amount ?? 0;

    const expense = expenses._sum.amount ?? 0;

    const balance = income - expense;

    return {
      balance,

      income,

      expense,

      accounts,

      vehicles,

      transactions,

      monthlyGrowth: 12.5,
    };
  }

  /*
    =====================================
    DASHBOARD CASHFLOWS
    =====================================
  */
  async cashflow(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },

      orderBy: {
        date: 'asc',
      },
    });

    const grouped: Record<
      string,
      {
        income: number;
        expense: number;
      }
    > = {};

    for (const tx of transactions) {
      const month = tx.date.toISOString().slice(0, 7);

      if (!grouped[month]) {
        grouped[month] = {
          income: 0,
          expense: 0,
        };
      }

      if (tx.type === TransactionType.INCOME) {
        grouped[month].income += tx.amount;
      } else {
        grouped[month].expense += tx.amount;
      }
    }

    return Object.entries(grouped).map(([month, values]) => ({
      month,

      income: values.income,

      expense: values.expense,

      balance: values.income - values.expense,
    }));
  }

  /*
    =====================================
    DASHBOARD MONTHLY ANALYTICS
    =====================================
  */
  async monthlyAnalytics(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },

      orderBy: {
        date: 'asc',
      },
    });

    const grouped: Record<
      string,
      {
        income: number;
        expense: number;
      }
    > = {};

    for (const transaction of transactions) {
      const month = transaction.date.toISOString().slice(0, 7);

      if (!grouped[month]) {
        grouped[month] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        grouped[month].income += transaction.amount;
      } else {
        grouped[month].expense += transaction.amount;
      }
    }

    return Object.entries(grouped).map(([month, values]) => ({
      month,

      income: values.income,

      expense: values.expense,

      balance: values.income - values.expense,
    }));
  }

  /*
    =====================================
    DASHBOARD RECENT ACTIVITIES
    =====================================
  */
  async recentActivities(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },

      include: {
        account: true,
        category: true,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 20,
    });

    return transactions;
  }
}
