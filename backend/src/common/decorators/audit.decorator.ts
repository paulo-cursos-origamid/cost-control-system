import { SetMetadata } from '@nestjs/common';

import { AuditAction } from '@/shared/types/enums/audit-action.enum';

export const AUDIT_KEY = 'audit';

export interface AuditMetadata {
  action: AuditAction;
  entity: string;
}

export const Audit = (action: AuditAction, entity: string) =>
  SetMetadata(AUDIT_KEY, {
    action,
    entity,
  });
