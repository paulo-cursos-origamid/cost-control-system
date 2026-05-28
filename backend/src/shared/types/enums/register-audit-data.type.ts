import type { AuditAction } from '@/shared/types/enums/audit-action.enum';

export type RegisterAuditData = {
  userId?: string;
  userEmail?: string;

  action: AuditAction;

  entity?: string;
  entityId?: string;

  method: string;
  route: string;
  ipAddress?: string;

  metadata?: unknown;
};
