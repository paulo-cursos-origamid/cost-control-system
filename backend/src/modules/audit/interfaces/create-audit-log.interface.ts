import { AuditAction } from '../../../shared/types/enums/audit-action.enum';

export interface CreateAuditLog {
  userId?: string;
  userEmail?: string;

  action: AuditAction;

  entity?: string;
  entityId?: string;

  method: string;
  route: string;

  ipAddress?: string;

  metadata?: Record<string, unknown>;
}
