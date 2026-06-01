import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validate(userId: string, dto: CreateTransactionDto) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: dto.accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const category = await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,

        OR: [{ userId }, { isDefault: true }],
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.type !== dto.type) {
      throw new BadRequestException('Transaction type differs from category');
    }

    return {
      account,
      category,
    };
  }
}
