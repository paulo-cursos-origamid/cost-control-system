import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Injectable()
export class CreditCardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCreditCardDto) {
    return await this.prisma.creditCard.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.creditCard.findMany({
      where: {
        userId,
        deletedAt: null,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deactivate(userId: string, id: string) {
    return await this.prisma.creditCard.update({
      where: {
        id,
        userId,
      },

      data: {
        active: false,
      },
    });
  }
}
