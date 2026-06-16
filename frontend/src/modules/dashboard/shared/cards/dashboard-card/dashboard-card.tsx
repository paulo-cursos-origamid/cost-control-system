interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?:
    | "users"
    | "premium"
    | "gold"
    | "lifetime"
    | "paid"
    | "late"
    | "mrr"
    | "arr"
    | "new"
    | "cancelled";
}
