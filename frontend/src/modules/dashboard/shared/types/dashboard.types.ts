import type { Transaction } from "@/modules/transactions/types/transaction.types";

// ==========================
// CARDS (KPIs)
export type DashboardCards = {
  balance: number;
  income: number;
  expense: number;
  accounts: number;
  vehicles: number;
  transactions: number;
  monthlyGrowth: number;
};

// ==========================
// FINANCIAL
export type TransactionSummary = {
  income: number;
  expense: number;
  balance: number;
};

export type FinancialSummary = {
  summary: {
    income: number;
    expense: number;
    balance: number;
  };

  comparison: {
    income: {
      current: number;
      previous: number;
    };

    expense: {
      current: number;
      previous: number;
    };

    balance: {
      current: number;
      previous: number;
    };
  };

  growth: {
    income: number;
    expense: number;
    balance: number;
  };

  accounts: {
    id: string;
    name: string;
    balance: number;
    type: string;
  }[];

  latestTransactions: Transaction[];

  topCategories: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
};
// ==========================
// VEHICLES
export type VehicleSummary = {
  vehicles: {
    id: string;
    name: string;
  }[];
  latestFuelSupplies: {
    id: string;
    vehicle?: { name?: string };
    totalAmount: number;
  }[];
  latestMaintenances: unknown[];
  costs: {
    fuel: number;
    maintenance: number;
    total: number;
  };
};

// ==========================
// CASHFLOW
export type CashflowItem = {
  month: string;
  income: number;
  expense: number;
  balance: number;
};
