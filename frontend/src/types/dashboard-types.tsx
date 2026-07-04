export interface FinancialSummaryResponse {
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

  accounts: unknown[];

  latestTransactions: unknown[];

  topCategories: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
}
