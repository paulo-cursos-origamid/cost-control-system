import { useCallback, useEffect, useState } from "react";

import { dashboardService } from "../services/dashboard.service";

import type {
  DashboardCards,
  FinancialSummary,
  VehicleSummary,
  CashflowItem,
} from "../shared/types/dashboard.types";

export function useDashboard() {
  const [cards, setCards] = useState<DashboardCards | null>(null);
  const [financial, setFinancial] = useState<FinancialSummary | null>(null);
  const [vehicles, setVehicles] = useState<VehicleSummary | null>(null);
  const [cashflow, setCashflow] = useState<CashflowItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [cardsRes, financialRes, vehiclesRes, cashflowRes] =
        await Promise.all([
          dashboardService.getCards(),
          dashboardService.getFinancial(),
          dashboardService.getVehicles(),
          dashboardService.getCashflow(),
        ]);

      setCards(cardsRes);
      setFinancial(financialRes);
      setVehicles(vehiclesRes);
      setCashflow(cashflowRes);
    } catch (error) {
      console.error("Dashboard error:", error);

      setCashflow([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    cards,
    financial,
    vehicles,
    cashflow,
    loading,
    reload: loadDashboard,
  };
}
