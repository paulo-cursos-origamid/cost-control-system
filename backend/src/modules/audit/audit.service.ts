import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import type { RegisterAuditData } from '../../shared/types/enums/register-audit-data.type';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  register(data: RegisterAuditData) {
    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        userEmail: data.userEmail,

        action: data.action,

        entity: data.entity,
        entityId: data.entityId,

        method: data.method,
        route: data.route,
        ipAddress: data.ipAddress,

        metadata: data.metadata as Prisma.InputJsonValue,
      },
    });
  }
}
