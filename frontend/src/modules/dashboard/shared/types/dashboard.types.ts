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

  accounts: {
    id: string;
    name: string;
    balance: number;
    type: string;
    isActive: boolean;
  }[];

  latestTransactions: {
    id: string;
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: string;
  }[];

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
};