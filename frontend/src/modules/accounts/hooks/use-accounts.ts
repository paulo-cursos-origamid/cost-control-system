import { useCrud } from "@/components/shared/crud/useCrud";

import { accountsService } from "../services/accounts.service";
import { Account } from "../types/account.types";

export function useAccounts() {
  return useCrud<Account>(accountsService);
}