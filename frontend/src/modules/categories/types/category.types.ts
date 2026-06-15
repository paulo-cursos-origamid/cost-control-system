export type CategoryType =
  | "INCOME"
  | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  type: CategoryType;
  isVehicleCategory: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
