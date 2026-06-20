"use client";


import { AdminDashboard } from "../admin/dashboards/admin-dashboard/admin-dashboard";
import { UserDashboard } from "../user/dashboards/user-dashboard";

export function DashboardPage() {
  /**
   * TEMPORÁRIO
   * depois virá do authStore
   */
  const role = "ADMIN";

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
