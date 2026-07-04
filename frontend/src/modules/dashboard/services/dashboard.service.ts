import { apiFetch } from "@/lib/api/fetcher";

import type {
  DashboardCards,
  FinancialSummary,
  VehicleSummary,
  CashflowItem,
} from "../shared/types/dashboard.types";

export const dashboardService = {
  getCards: () => apiFetch<DashboardCards>("/api/dashboard/cards"),

  getFinancial: () => apiFetch<FinancialSummary>("/api/dashboard/financial"),

  getVehicles: () => apiFetch<VehicleSummary>("/api/dashboard/vehicles"),

  getCashflow: () => apiFetch<CashflowItem[]>("/api/dashboard/cashflow"),
};
