export type AccountType =
  | "CASH"
  | "CHECKING"
  | "SAVINGS"
  | "CREDIT_CARD"
  | "INVESTMENT";

export interface Account {
  id: string;
  name: string;
  balance: number;
  initialBalance: number;
  color?: string;
  type: AccountType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
