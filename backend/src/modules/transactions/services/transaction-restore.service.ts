import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class TransactionRestoreService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.update({
      where: {
        id,
      },

      data: {
        deletedAt: null,
      },
    });
  }
}
