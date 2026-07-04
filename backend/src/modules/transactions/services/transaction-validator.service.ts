import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { SubCategory } from '@prisma/client';

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
    let subCategory: SubCategory | null = null;
    if (dto.subCategoryId) {
      subCategory = await this.prisma.subCategory.findUnique({
        where: {
          id: dto.subCategoryId,
        },
      });

      if (!subCategory) {
        throw new NotFoundException('Subcategoria não encontrada');
      }

      if (subCategory.categoryId !== dto.categoryId) {
        throw new BadRequestException(
          'Subcategoria não pertence à categoria selecionada',
        );
      }
    }
    return {
      account,
      category,
      subCategory,
    };
  }
}
