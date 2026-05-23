import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateInstallmentDto } from './dto/create-installment.dto';

@Injectable()
export class InstallmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateInstallmentDto) {
    const installmentAmount = dto.totalAmount / dto.totalInstallments;

    const installments: Prisma.InstallmentCreateManyInput[] = [];

    for (let i = 1; i <= dto.totalInstallments; i++) {
      const dueDate = new Date(dto.firstDueDate);

      dueDate.setMonth(dueDate.getMonth() + (i - 1));

      installments.push({
        title: `${dto.title} ${i}/${dto.totalInstallments}`,

        description: dto.description,

        totalAmount: dto.totalAmount,

        installmentAmount,

        totalInstallments: dto.totalInstallments,

        currentInstallment: i,

        purchaseDate: new Date(dto.purchaseDate),

        dueDate,

        userId,

        accountId: dto.accountId,

        categoryId: dto.categoryId,
      });
    }

    const result = await this.prisma.installment.createMany({
      data: installments,
    });

    return result;
  }

  async findAll(userId: string) {
    const installments = await this.prisma.installment.findMany({
      where: {
        userId,
      },

      orderBy: {
        dueDate: 'asc',
      },
    });

    return installments;
  }
}
